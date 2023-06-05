const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors'); 
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const crypto = require('crypto');

app.use(express.json());

var corsOptions = {
  origin: 'http://127.0.0.1:5500',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const sequelize = new Sequelize('pesquisa', 'joao', '150149', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {  
    type: DataTypes.STRING,
    allowNull: false
  },
}, {

});

const Survey = sequelize.define('Survey', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  satisfaction: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comments: {
    type: DataTypes.TEXT
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {

});

User.hasMany(Survey);
Survey.belongsTo(User);

app.post('/survey', async (req, res) => {
  const { name, satisfaction, comments, UserId } = req.body;

  try {
    const newSurvey = await Survey.create({
      name,
      satisfaction,
      comments,
      UserId: UserId 
    });

    res.status(201).json(newSurvey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/survey', async (req, res) => {
  try {
    const surveys = await Survey.findAll();
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Unable to sync with the database:', error);
});

const createUser = async () => {
  try {
    const user = await User.create({
      username: "Joao",
      password: "123"
    });
    console.log("Usuário criado com sucesso:", user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
  }
};

createUser();

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.redirect('../principal/principal.html')
      return res.json({ message: 'Login bem-sucedido' });
    } else {
      return res.status(401).json({ error: 'Senha inválida' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

app.post('/forgot', async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const newPassword = crypto.randomBytes(4).toString('hex');
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({
      password: hashedPassword
    });

    console.log(`A new password has been created for ${username}: ${newPassword}`);

    return res.json({ message: 'Uma nova senha foi enviada para o seu email' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao recuperar senha' });
  }
});
