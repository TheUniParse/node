import prompts from 'prompts'




async function singlePrompt() {
  console.log('Nightclub age virification:')

  const question = {
    type: 'number',
    name: 'age',
    message: 'How old are you?',
    validate: age => age >= 18 || `Nightclub is 18+ only`
  }

  const { age } = await prompts(question)
  console.log(`Welcom to Nightclub, age accepted ${age} >= 18`)
}

async function sighnUp() {
  let prevPw

  // types: input'D number confirm list rawlist expand checkbox password editor

  const pickType = {
    type: 'list',
    name: 'list',
    message: 'pick type from the list',
    choices: [
      'input',
      'number',
      'confirm',
      'list',
      { name: 'raw list', value: 'rawlist' },
      'expand',
      'checkbox',
      'password',
      'editor'
    ]
  }

  const questions = [
    {
      type: 'text',
      name: 'name',
      message: 'what your name',
      validate: name => name.length >= 4 || 'use name with 4+ charactors'
    }, {
      type: 'password',
      name: 'pw',
      message: 'create password',
      validate: pw => {
        if (pw.length < 4) return 'pleas Enter 4+ characters'

        prevPw = pw
        return true
      }
    }, {
      type: 'password',
      name: 'pwConfirm',
      message: 'confirm your password',
      validate: pw => pw === prevPw || "passwords don't match"
    }, {
      type: 'invisible',
      name: 'pwLastConfirm',
      message: 'confirm your password one last time',
      validate: pw => pw === prevPw || "passwords don't match"
    }, {
      type: 'number',
      name: 'age',
      message: 'How young you are?',
      validate: age => age <= 30 || `sorry, no 30+`
    }, {
      type: prevAge => prevAge < 18 ? 'text' : null,
      name: 'permission',
      message: 'since you are 18-, do your parents agree?',
      validate: permission => permission === 'yes' || 'sorry, no access'
    }, {
      type: 'date',
      name: 'birthday',
      message: 'what is your birthday?',
      initial: new Date('2000-01-01'),
      mask: "YYYY-MM-DD",
      validate: date => date <= Date.now() || 'imposible age!!'
    }, {
      type: 'select',
      name: 'gender',
      message: 'what your gender?',
      choices: [
        { title: 'male', value: 'male' },
        { title: 'female', value: 'female' },
        { title: 'other', value: 'other' },
      ]
    }, {
      type: 'multiselect',
      name: 'colors',
      message: 'seelct all your favorite colors:',
      choices: [
        { title: 'cyan', value: '#0ff' },
        { title: 'magenta', value: '#f0f' },
        { title: 'yellow', value: '#ff0' },
        { title: 'dark orange', value: '#ff8c00' },
        { title: 'yellow green', value: '#9acd32' },
        { title: 'gray', value: '#333' },
      ]
    }
  ]

  console.log('signing up ...')

  const { name, age, birthday, gender, colors } = await prompts(questions, {
    onCancel: () => console.log('canceling...')
  })

  console.log(`welcome ${name}
  your age are ${age}
  your birthday is ${birthday.toDateString()}
  and your gender are ${gender}
  and your favirote colors are ${colors.join(', ')}`)
}