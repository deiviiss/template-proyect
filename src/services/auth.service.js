const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const { config } = require('../config')
const nodemailer = require('nodemailer');

//service
const UserService = require('./user.service');
const service = new UserService()

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email)

    if (!user) {
      throw boom.unauthorized()
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw boom.unauthorized()
    }

    delete user.dataValues.password

    return user
  }

  async singToken(user) {

    const jwtConfig = {
      expiresIn: '7d'
    }

    const payload = {
      sub: user.userId,
      role: user.role
    }

    const token = jwt.sign(payload, config.jwtSecret, jwtConfig)

    delete user.dataValues.recoveryToken

    return { user, token }
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email)

    if (!user) {
      throw boom.unauthorized()
    }

    const payload = { sub: user.userId }

    const token = jwt.sign(payload, config.jwtRecoveryPassword, { expiresIn: '15min' })

    const link = `http://${config.dbHost}/recovery?token=${token}`
    console.log('token');
    console.log(token);
    await service.update(user.userId, { recoveryToken: token })

    const mail = {
      from: config.smtpEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Recuperar contraseña", // Subject line
      // text: "it's working", // plain text body
      html: `<b>Ingresa a este link => ${link} </b>`, // html body
    }

    const rta = await this.sendMail(mail)

    return rta
  }

  async sendMail(infoMail) {

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
        // user: testAccount.user, // generated ethereal user
        // pass: testAccount.pass, // generated ethereal password
      },
    });

    await transporter.sendMail(infoMail)

    return { message: 'mail sent, ok!' }
  }

  async changePassword(token, newPassword) {

    try {
      const payload = jwt.verify(token, config.jwtRecoveryPassword)

      const user = await service.findOne(payload.sub)

      if (user.recoveryToken !== token) {
        throw boom.unauthorized()
      }

      await service.update(user.userId, { recoveryToken: null, password: newPassword })

      return { message: 'Password changed' }
    } catch (error) {
      throw boom.unauthorized()
    }
  }
}

module.exports = AuthService