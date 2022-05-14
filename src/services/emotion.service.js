const boom = require('@hapi/boom')

//models - conection to bd
const { models } = require('./../libs/sequelize')

class EmotionService {

  constructor() { }

  //service methods

  //create emotion
  async create(data) {

    const newEmotion = await models.Emotion.create(data);

    return newEmotion;
  }

  //get all emotions
  async find() {

    const data = await models.Emotion.findAll(
      {
        // include:['thought']
      }
    );

    return data;
  }

  //get emotion by id
  async findOne(emotionId) {

    const emotion = await models.Emotion.findByPk(emotionId)

    if (!emotion) {
      throw boom.notFound('Emotion not found, sorry')
    }

    return emotion
  }

  //update emotion
  async update(emotionId, changes) {
    const emotion = await this.findOne(emotionId)

    const rta = await emotion.update(changes)

    return rta
  }

  //delete emotion
  async delete(emotionId) {
    const emotion = await this.findOne(emotionId)
    await emotion.destroy()

    return { emotionId }
  }
}

module.exports = EmotionService