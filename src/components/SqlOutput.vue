<template>
  <div>
    <div>変換後</div>
    <textarea v-model="sqlOutputData"></textarea>
  </div>
</template>

<script>
export default {
  /* eslint-disable no-console */
  name: 'SqlOutput',
  methods: {
    test: function (strSqlData) {
      return strSqlData.replace(/IN\((\S*,{0,1}\s*)*\)/gi, 'IN($1$2$3$4$5)AAAAA')
    },
    preFormatting: function (strSqlData) {
      let strPreFormattedData = ''
      // タブ、連続する半角スペース、改行は削除
      // console.log(strValue.replace(/\r?\n+/g, ' ').replace(/\t/g, ' ').replace(/\s{2,}/g, ' '))
      strPreFormattedData = strSqlData.replace(/\r?\n+/g, ' ').replace(/\t/g, ' ').replace(/((\(|\)))/g,' $1 ').replace(/\s{2,}/g, ' ')
      strPreFormattedData = strPreFormattedData.replace(/(SELECT)\s(\*)/ig, '$1 #$2').replace(/(,)\s(\*)/ig, '$1 #$2')
      return strPreFormattedData
    },
    mainFormatting: function (strSqlData) {
      let words = ''
      let beforeWord = '' // 前の単語
      let afterWord = '' // 次の単語
      let outputText = ''
      let sentences = ['']
      let sentenceIndex = 0
      let breakDiv = true //改行フラグ
      let spacedDiv = false //追加行間フラグ
      let functionDiv = false //関数フラグ
      //let functionParenthesesDiv = false //関数括弧フラグ
      let functionParenthesesCount = 0 //関数括弧のカウント
      // **************************************************************
      // ■ keywordsオブジェクト使われ方
      //   value        : 単語がvalueの値と一致した場合「改行しないか」、「行間をあけるか」について判定される
      //   noBreakWords : 次の単語がnoBreakWordsと一致した場合改行しない
      //   spacedWords  : 前の単語がspacedWordsと一致した場合行間を開ける(追加で改行する)
      // **************************************************************
      const keywords = {
        operator: {value: /^([=+<>\-%!]{1,2}|LIKE)$/i, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},
        openParentheses: {value: /^\($/i, noBreakWords: /^(?!.*)$/i, spacedWords: /^(?!.*)$/i},
        closeParentheses: {value: /^\)$/i, noBreakWords: /^(AS|OVER)$/i, spacedWords: /^(?!.*)$/i},
        in: {value: /^(IN|IS|BETWEEN)$/i, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},
        as: {value: /^AS$/i, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},
        join: {value: /^JOIN$/i, noBreakWords: /^[^()]*$/i, spacedWords: /^(?!.*)$/i},
        AggregateFnc: {value: /^(MAX|AVG|COUNT|MIN|SUM)$/i, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},        
        select: {value: /^SELECT$/i, noBreakWords: /^(TOP|DISTINCT)$/i, spacedWords: /^(UNION|ALL)$/i},
        from: {value: /^FROM$/i, noBreakWords: /^(?!.*)$/i, spacedWords: /^.*$/i},
        where: {value: /^(WHERE|HAVING)$/i, noBreakWords: /^(?!.*)$/i, spacedWords: /^.*$/i},
        order: {value: /^(ORDER|GROUP)$/i, noBreakWords: /^BY$/i, spacedWords: /^.*$/i},
        inner: {value: /^INNER$/i, noBreakWords: /^JOIN$/i, spacedWords: /^.*$/i},
        left: {value: /^LEFT$/i, noBreakWords: /^(OUTER|JOIN)$/i, spacedWords: /^.*$/i},
        outer: {value: /^OUTER$/i, noBreakWords: /^JOIN$/i, spacedWords: /^(?!.*)$/i},
        top: {value: /^TOP$/i, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},
        union: {value: /^UNION$/i, noBreakWords: /^ALL$/i, spacedWords: /^.*$/i},
        full: {value: /^FULL$/i, noBreakWords: /^(OUTER|JOIN)$/i, spacedWords: /^.*$/i},
        case: {value: /^(WHEN|ELSE|THEN)/i, noBreakWords: /^.*/i, spacedWords: /^(?!.*)$/i},
        is: {value: /^IS$/i, noBreakWords: /^NULL/i, spacedWords: /^(?!.*)$/i},
        asterisk: {value: /^#\*$/i, noBreakWords: /^(?!.*)$/i, spacedWords: /^(?!.*)$/i},
        kake: {value: /^\*$/i, noBreakWords: /^.*$/i, spacedWords: /^(?!.*)$/i},
        others: {value: /.*$/i, noBreakWords: /(^([=,+,<,>,-,%,!,*]+|AS|ASC,?|DESC,?|THEN|LIKE|IS|NOT)$)|^(IN\(?|BETWEEN\(?|OVER\(?)$/i, spacedWords: /^(?!.*)$/i}
      }
      //関数名
      const functionName = /^(COUNT\(?|SUM\(?|AVG\(?|MAX\(?|MIN\(?|ASCII\(?|CONVERT\(?|CAST\(?|ROW_NUMBER\(?|OVER\(?|DENSE_RANK\(?|IN\(?|BETWEEN\(?|ISNULL\(?)/i
      
      // SQL文を単語ごとに配列に格納
      words = strSqlData.split(' ')

      // 文字列整形スタート
      words.forEach((word, index) => {
        // 基本:単語毎に改行,行間は空けない
        breakDiv = true
        spacedDiv = false
        beforeWord = words[index - 1]
        afterWord = words[index + 1]

        //関数内(MAX,IN,ISNULL)などは括弧の中では改行しない
        if (functionName.test(word)) {
          functionDiv = true
          if (/^(?!.*\().+$/.test(word) && /^(?!.*\().+$/.test(afterWord)) {
            functionDiv = false
          }
        }
        if (functionDiv == true && /\(/.test(word)) {
          functionParenthesesCount++
        }
        if (functionDiv == true && /\)/.test(word)) {
          functionParenthesesCount--
          if (functionParenthesesCount <= 0) {
            functionDiv = false
          }
        }

        //関数内は改行処理をスキップ
        if (functionDiv == true) {
          breakDiv = false
          spacedDiv = false
          if(!(/(\()$/.test(word) || /^(\))/.test(afterWord))){
            word = word + ' '
          }
        //改行処理
        }else{
          for (let keyword of Object.keys(keywords)) {
            // console.log(keywords[keyword].value.test(word))
            if (keywords[keyword].value.test(word)) {
              console.log('***文字判定***')
              console.log('WORD:' + word)
              console.log('KEYWORD:' + keyword)
              console.log('AFTERWORD:' + afterWord)
              console.log('行間判定:' + keywords[keyword].spacedWords.test(beforeWord))
              console.log('改行判定:' + keywords[keyword].noBreakWords.test(afterWord))

              // 前の単語が行間開ける語だった場合のみ追加で改行を行う
              if (keywords[keyword].spacedWords.test(beforeWord)) {
                spacedDiv = true
              }
              // 次の単語が改行禁止語だった場合のみ改行しない
              if (keywords[keyword].noBreakWords.test(afterWord)) {
                // console.log('***次改行なし***')
                // console.log('word:' + word)
                // console.log('words[index + 1]:' + afterWord)
                // console.log('index:' + index)
                word = word + ' '
                breakDiv = false
              }
              if (spacedDiv === true || breakDiv === false) break
            }
          }
        }
 
        // 行間の追加
        if (spacedDiv) {
          sentenceIndex++
          sentences[sentenceIndex] = ''
        }
        // 単語を文に追加
        sentences[sentenceIndex] = sentences[sentenceIndex] + word
        // 改行
        if (breakDiv) {
          sentenceIndex++
          sentences[sentenceIndex] = ''
        }
        // outputText = outputText + word
        //console.log(sentences[sentenceIndex])
      })
      // console.log(sentences.join('\n'))
      // sentences = this.indentFormatting(sentences)
      outputText = sentences.join('\n')
      return outputText
    },
    indentFormatting: function (strSqlData) {
      let indentCount = 0
      let outputText
      let sentences

      sentences = strSqlData.split('\n')

      outputText = sentences.map(sentence => {
        if ((/(\)\s*|END)/i).test(sentence) && (/^(?!.*\().*$/i).test(sentence)) {
          indentCount--
        }
        // eslint-disable-next-line
        //console.log(indentCount);
        for (let i = 0; i < indentCount; i++) {
          sentence = '\t' + sentence
        }
        if ((/(\(|CASE)/i).test(sentence) && (/^(?!.*\)).*$/i).test(sentence)) {
          indentCount++
        }
        return sentence
      })
      outputText = outputText.join('\n')
      return outputText
    }
  },
  computed: {
    sqlOutputData: {
      get () {
        let sqlInputData = this.$store.state.sqlInputData
        let sqlTmpData
        // sqlTmpData = this.test(sqlInputData);
        sqlTmpData = this.preFormatting(sqlInputData)
        sqlTmpData = this.mainFormatting(sqlTmpData)
        sqlTmpData = this.indentFormatting(sqlTmpData)
        sqlTmpData = sqlTmpData.replace(/#\*/ig, '*')
        this.$store.commit('updateSqlOutputData', sqlTmpData)

        return sqlTmpData
      },
      set (value) {
        this.$store.commit('updateSqlInputData', value)

      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
