#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
AIM backend server.
"""


# ----------------------------------------------------------------------------
# Imports
# ----------------------------------------------------------------------------

# Standard library modules
from pathlib import Path
from typing import Any, Dict, Tuple

# Third-party modules
import motor
import tornado.ioloop
import tornado.log
import tornado.options
import tornado.web
import tornado.websocket
from loguru import logger
from motor.motor_tornado import MotorClient, MotorDatabase
from tornado.options import define, options

# First-party modules
from aim.common import configmanager, utils
from aim.common.constants import SERVER_CONFIG_FILE
from aim.handlers import AIMWebSocketHandler

# ----------------------------------------------------------------------------
# Metadata
# ----------------------------------------------------------------------------

__author__ = "Markku Laine"
__date__ = "2021-03-26"
__email__ = "markku.laine@aalto.fi"
__version__ = "1.0"


# ----------------------------------------------------------------------------
# Definitions
# ----------------------------------------------------------------------------

define(
    "environment", default="development", help="Runtime environment", type=str
)
define("name", default="aim-dev", help="Instance name", type=str)
define("port", default=8888, help="Port to listen on", type=int)
define(
    "data_inputs_dir",
    default=None,
    help="Directory to store input files",
    type=Path,
)
define(
    "data_results_dir",
    default=None,
    help="Directory to store result files",
    type=Path,
)
define("database_uri", default=None, help="Database URI", type=str)
# In addition, Tornado provides built-in support for the "logging" (level) option


# ----------------------------------------------------------------------------
# Functions
# ----------------------------------------------------------------------------


def parse_options() -> None:
    server_config_filepath: Path = Path(SERVER_CONFIG_FILE)
    tornado.options.logging = None
    if server_config_filepath.exists() and server_config_filepath.is_file():
        tornado.options.parse_config_file(SERVER_CONFIG_FILE)
    else:
        tornado.options.parse_command_line()


def make_app() -> Tuple[MotorDatabase, tornado.web.Application]:
    client: MotorClient = motor.motor_tornado.MotorClient(options.database_uri)
    db: MotorDatabase = client.get_database()
    settings: Dict[str, Any] = {
        "db": db,
        "debug": True if options.environment == "development" else False,
        "websocket_max_message_size": 5242880,  # 5 MB
    }
    return (db, tornado.web.Application(
        handlers=[
            (r"/", AIMWebSocketHandler),
        ],
        **settings,
    ))


def main() -> None:
    configmanager.options = configmanager.parser.parse_known_args()[
        0
    ]  # Get known options, i.e., Namespace from the tuple

    # Parse options
    parse_options()

    # Make application
    db, app = make_app()
    app.listen(options.port)
    logger.info(
        "Server '{}' in {} environment is listening on http://localhost:{}".format(
            options.name, options.environment, options.port
        )
    )

    # Configure logger
    configmanager.database_sink = lambda msg: db['errors'].insert_one({ "error": msg })
    utils.configure_logger()

    # Start application
    tornado.ioloop.IOLoop.current().start()


# ----------------------------------------------------------------------------
# Application
# ----------------------------------------------------------------------------

if __name__ == "__main__":
    main()
