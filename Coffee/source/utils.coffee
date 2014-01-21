utils = {}

class LoggerInterface
  log: ->
    throw Error("error in log")
  padding: ->
    throw Error("error in padding")

class RegularLogger extends LoggerInterface
  methods: -> ['log', 'padding']

utils.LoggerInterface = LoggerInterface
utils.RegularLogger = RegularLogger

module.exports = {utils}