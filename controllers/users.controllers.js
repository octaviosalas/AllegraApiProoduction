import User from "../models/users.js"
import bcrypt from "bcrypt"

export const getAllUsers = async (req, res) => { 
    User.find()
          .then((users) => { 
            res.send(users)
           })
          .catch((err) => { 
           console.log(err)
           })
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
    const {name, surname, email, password, rol} = req.body
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
                                    surname: surname,
                                    password: passwordHash,
                                    email: email,
                                    rol: rol
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
  const { userId } = req.params;
  const {name, surname, email, rol} = req.body


  try {
        User.findByIdAndUpdate({ _id: userId }, { 
              name: name,
              surname: surname,
              email: email,
              rol: rol
          })
          .then((userDataEdited) => {                                      
          res.status(200).json({message: "The data has been edited succesfully", userDataEdited});
          })
          .catch((err) => { 
            res.status(404).json({ message: 'Error!', err });
          })

    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
}


export const deleteUser = async (req, res) => { 
  const { userId } = req.params;
  console.log("RECIBI:", req.params)

  try {
    const deletedUser = await User.findByIdAndDelete({_id: userId});

    if (deletedUser) {
      res.status(200).json({ message: 'User deleted Correctly', deleted: deletedUser });
    } else {
      res.status(404).json({ message: 'User doesen`t exist' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
}