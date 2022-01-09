/**
 * @name DiscordFormatter
 * @description Discord Formatter is a tool that helps you format your discord messages. It supports colored text with codeblocks.
 * @version 0.1
 * @author jerbear
 * @authorLink https://github.com/jerbear2008
 * @authorId 787042660724113408
 * @website https://jerbear2008.github.io/discord-formatter
 * @source https://github.com/jerbear2008/discord-formatter
 * @updateUrl https://raw.githubusercontent.com/jerbear2008/discord-formatter/main/DiscordFormatter.plugin.js
 */

module.exports = class ExamplePlugin {
  start() {
    BdApi.alert('DiscordFormatter', 'started')
  }
  stop() {
    BdApi.alert('DiscordFormatter', 'stopped')
  }
}