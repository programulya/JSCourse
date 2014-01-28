utils = {}

class LoggerInterface
  log: (args...) ->
    if args.length is 0 then throw Error("error in log")
    else console.log args
  padding: (str, length, symbol) ->
    if arguments.length is 0 then throw Error("error in padding")
    else if str.length > length then return str
    else if not symbol? then symbol = " "
    while (length -= 1)
      str = symbol + str
    return str

class RegularLogger extends LoggerInterface
  methods: -> ['log', 'padding']

utils.LoggerInterface = LoggerInterface
utils.RegularLogger = RegularLogger

module.exports = {utils}