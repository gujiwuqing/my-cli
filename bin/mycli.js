#! /usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')

program
  // 定义命令和参数
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    inquirer.prompt([
      {
        name:'conf',              /* key */
        type:'confirm',           /* 确认 */
        message:'是否创建新的项目？' /* 提示 */
      },
      {
        type: 'input', //type： input, number, confirm, list, checkbox ...
        name: 'name', // key 名
        message:'请输入项目名称？',
        default: 'my-node-cli' // 默认值
      },
      {
        name:'author',
        message:'请输入作者？',
        when: res => Boolean(res.conf)
      },{
        type: 'list',            /* 选择框 */
        message: '请选择公共管理状态？',
        name: 'state',
        choices: ['mobx','redux'], /* 选项*/
        filter: function(val) {    /* 过滤 */
          return val.toLowerCase()
        },
        when: res => Boolean(res.conf)
      }
    ]).then(answers => {
      // 打印互用输入结果
      console.log(answers)
    })
  })

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

// 解析用户执行命令传入参数
program.parse(process.argv);
