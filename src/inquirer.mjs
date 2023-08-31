import inquirer from "inquirer"

let prevPw

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
    validate: date => date <= new Date() || 'imposible age!!'
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

const { name, age, birthday, gender, colors } = await inquirer.prompt(questions)

console.log(`welcome ${name}
  your age are ${age}
  your birthday is ${birthday.toDateString()}
  and your gender are ${gender}
  and your favirote colors are ${colors.join(', ')}`)