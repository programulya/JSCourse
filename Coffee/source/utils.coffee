utils = {}

class LoggerInterface
log = () ->
  throw Error("error in log")
padding = () ->
  throw Error("error in padding")

class RegularLogger extends LoggerInterface

utils.LoggerInterface = LoggerInterface
module.exports = {utils}