let formatter = {
  format: function(text) {
    let lines = text.split('\n')
    let output = ''
    lines.forEach(line => { //proccess line
      if (line.startsWith('\\')) {
        output += '\n' + line.substring(1)
        return
      }

      let formattingCode = line.split(' ')[0]
      if (this.formattingTemplates.codeblock[formattingCode]) { //check for codeblock format
        let formattedLine = this.formattingTemplates.codeblock[formattingCode].split('S').join(line.substring(2))
        output += formattedLine
        return
      }

      let formattingCodes = formattingCode.split('')
      let formattedLine = line.substring(formattingCode.length + 1)
      for (var code in this.formattingTemplates.inline) { //check each inline format
        console.log(code)
        let position = formattingCodes.indexOf(code)
        if (position === -1) continue
        formattingCodes.splice(position, 1)
        formattedLine = this.formattingTemplates.inline[code].split('S').join(formattedLine)
      }
      if (formattingCodes.length === 0) {
        output += '\n' + formattedLine
        return
      }

      output += '\n' + line
    })
    return output.trim()
  },
  formattingTemplates: {
    inline: {
      "c": '`S`',
      "i": '*S*',
      "b": '**S**',
      "s": '~~S~~',
      "u": '__S__',
      "S": '||S||',
      "q": '> S'
    },
    codeblock: {
      "r": '```diff\n- S\n```',
      "o": '```cs\n# S\n```',
      "y": '```fix\n  S\n```',
      "g": '```diff\n+ S\n```',
      "B": '```md\n# S\n```',
      "w": '```\n  S\n```',
      "k": '```md\n> S\n```',
      "I": '```asciidoc\n\'⠀S \'\n```',
    }
  }
}