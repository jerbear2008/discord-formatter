let formatter = {
  format: function(text) {
    let lines = text.split('\n')
    let output = ''
    lines.forEach(line => {
      if (line.startsWith('\\')) {
        output += '\n' + line.substring(1)
        return
      }
      let formattingCode = line.split(' ')[0]

      if (formattingCode.length === 1) {
        if (this.formattingTemplates.inline[formattingCode]) {
          let formattedLine = this.formattingTemplates.inline[formattingCode].split('S').join(line.substring(2))
          output += '\n' + formattedLine
          return
        }
        if (this.formattingTemplates.codeblock[formattingCode]) {
          let formattedLine = this.formattingTemplates.codeblock[formattingCode].split('S').join(line.substring(2))
          output += formattedLine
          return
        }
      }

      processMultiCode: {
        let formattedLine = line.substring(formattingCode.length + 1)
        let formattingCodes = formattingCode.split('')
        let valid = true
        formattingCodes.forEach(code => {
          if (!this.formattingTemplates.inline[code]) {
            valid = false
            return
          }
          formattedLine = this.formattingTemplates.inline[code].split('S').join(formattedLine)
        })
        if (!valid) break processMultiCode
        output += '\n' + formattedLine
        return
      }

      output += '\n' + line
    })
    return output.trim()
  },
  formattingTemplates: {
    inline: {
      "i": '*S*',
      "b": '**S**',
      "u": '__S__',
      "s": '~~S~~',
      "c": '`S`',
      "q": '> S',
      "S": '||S||'
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
