const user={
    state:{
    token:"",
    userAvator:"",
    userId:"",
    userIntroduction:"",
    userPhoneNum:"",
    userEmail:"",
    username:"",
    userId:"",
    },
    mutations:{
        setUserId(state,userId){
            state.userId=userId;
            window.sessionStorage.setItem("userId",JSON.stringify(userId))
        },
 setToken(state,token){
     state.token=token;
     window.sessionStorage.setItem("token",JSON.stringify(token))
 },
setUserAvator(state,userAvator){
    state.userAvator=userAvator;
    window.sessionStorage.setItem("userAvator",JSON.stringify(userAvator))
},
setUserId(state,userId){
    state.userId=userId;
    window.sessionStorage.setItem("userId",JSON.stringify(userId))
},
setUserIntroduction(state,userIntroduction){
    state.userIntroduction=userIntroduction;
    window.sessionStorage.setItem("userIntroduction",JSON.stringify(userIntroduction))
},
setUserPhoneNum(state,userPhoneNum){
    state.userPhoneNum=userPhoneNum;
    window.sessionStorage.setItem("userPhoneNum",JSON.stringify(userPhoneNum))
},
setUserEmail(state,userEmail){
    state.userEmail=userEmail;
    window.sessionStorage.setItem("userEmail",JSON.stringify(userEmail))
},
setUsername(state,username){
    state.username=username;
    window.sessionStorage.setItem("username",JSON.stringify(username))
}
    },
    getters:{
        getUserId(state){
            let userId= state.userId;
            if(!userId){
              userId= JSON.parse(window.sessionStorage.getItem("userId"))
            }
            return userId;
        },
    getToken(state){
      let token= state.token;
      if(!token){
         token= JSON.parse(window.sessionStorage.getItem("token"))
      }
      return token;
    },
    getUserAvator(state){
        let userAvator= state.userAvator;
        if(!userAvator){
            userAvator= JSON.parse(window.sessionStorage.getItem("userAvator"))
        }
        return userAvator;
    },
    getUserId(state){
        let userId= state.userId;
        if(!userId){
            userId= JSON.parse(window.sessionStorage.getItem("userId"))
        }
        return userId;
    },
    getUserIntroduction(state){
        let userIntroduction= state.userIntroduction;
        if(!userIntroduction){
            userIntroduction= JSON.parse(window.sessionStorage.getItem("userIntroduction"))
        }
        return userIntroduction;
    },
    getUserPhoneNum(state){
        let userPhoneNum= state.userPhoneNum;
        if(!userPhoneNum){
            userPhoneNum= JSON.parse(window.sessionStorage.getItem("userPhoneNum"))
        }
        return userPhoneNum;
    },
    getUserEmail(state){
        let userEmail= state.userEmail;
        if(!userEmail){
            userEmail= JSON.parse(window.sessionStorage.getItem("userEmail"))
        }
        return userEmail;
    },
    getusername(state){
        let username= state.username;
        if(!username){
            username= JSON.parse(window.sessionStorage.getItem("username"))
        }
        return username;
    },

}
}
export default user;