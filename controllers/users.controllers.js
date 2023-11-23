import User from "../models/users.js"

export const getAllUsers = async (req, res) => { 
   /*   User.find()
          .then((users) => { 
            res.send(users)
           })
          .catch((err) => { 
           console.log(err)
           })*/

           res.send("hi")
}


export const getUserData = async (req, res) => { 
    const {userId} = req.params

            User.find({_id: userId})
                .then((user) => { 
                    res.json(user)
                })
                .catch((err) => { 
                console.log(err)
                })
}


export const Register = async (req, res) => { 
    const {name, email, password} = req.body
    console.log(req.body)
    await User.findOne({email})
               .then((user) => { 
                     if(user) { 
                        res.json({message: "The email exist in our DataBase. Please, select other"})
                     } else if (!name || !email || !password) { 
                        res.json({message: "Data is missing to be able to register. Please complete all fields"})
                     } else { 
                        console.log(req.body)
                        bcrypt.hash(password, 10, (err, passwordHash) => { 
                           if(err) res.json({err})
                           else { 
                                 const newUser = new User ( { 
                                    name: name,
                                    password: passwordHash,
                                    email: email,
                                 })
                                 newUser.save()
                                       .then((user) => { 
                                             res.json({message: "Your Account has been created Succesfully. Now, we redirect you tu Login.", user})     
                                       })
                                       .catch((err) => console.log(err))               
                           }
                        })
                     }
    })
}


export const Login = async (req, res) => { 
    const {email, password} = req.body
    console.log(req.body)
 
    try {
       let checkUser = await User.findOne({email: email})
       if(!checkUser) { 
          res.json({message: "The Email is not Registered. Please, go to create your Account and try Again!"})
       } else { 
          const hashedPassword = checkUser.password;
          bcrypt.compare(password, hashedPassword)
                .then((samePassword) => { 
                     if(samePassword) { 
                      const {id, name, email} = checkUser
                      res.json({
                          id: id,
                          name: name,
                          email: email                    
                      })
                     } else { 
                      res.json({message: "You typed an incorrect password"})
                     }
                })
       }
    } catch (error) {
       res.send("The data entered is Incorrect. I cant find it")
         console.log(error)
    }
 }

export const EditUserData = async (req, res) => { 
    try {
        const { userId } = req.params;
        const { name, email, lastPassword, newPassword } = req.body;
    
        const user = await User.findOne({ _id: userId });
    
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    
        const isPasswordValid = await bcrypt.compare(lastPassword, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'La contraseña actual es incorrecta' });
        }
    
        const updates = {};
    
        if (name && name !== user.name) {
          updates.name = name;
        }
    
        if (email && email !== user.email) {
          updates.email = email;
        }
    
        if (newPassword) {
          const hashedNewPassword = await bcrypt.hash(newPassword, 10);
          updates.password = hashedNewPassword;
        }
    
        if (Object.keys(updates).length > 0) {
          await User.findOneAndUpdate({ _id: userId }, { $set: updates });
        }
    
        res.status(200).json({ message: 'Datos actualizados con éxito' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
}
