/* [...nextauth] -- signifies dynamic nextauth */
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ], 
  callbacks: {

        async session({ session }){
          //keeping track of user logged in
          const sessionUser = await User.findOne({
            email: session.user.email
          })
      
          //updating the session id everytime
          session.user.id = sessionUser._id.toString()
      
          return session;
        }, 
      
        async signIn({ profile }){
          try {
            await connectToDB()
      
            //checking if a user exists already
            const userExists = await User.findOne({
              email: profile.email
            })
      
            //if not, create a new user 
            if(!userExists){
              await User.create({
                email: profile.email,
                username: profile.name.replace(" ", "").toLowerCase(),
                image: profile.picture
              })
            }
      
            return true;
          } catch (error) {
            console.log(error)
            return false
          }
      }
  }
})

export {handler as GET, handler as POST}