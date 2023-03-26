import {event1,event2,event3,event4} from "../../Assets/img/index"
export const eventData = [{
    image:event1,
    title:"Tech expo",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
    ,createdAt:new Date()
},{
    image:event2,
    title:"Business meeting",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
    ,createdAt:new Date()
},
{
    image:event3,
    title:"Market shopping",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
    ,createdAt:new Date()
},
{
    image:event4,
    title:"Art Galla",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam."
    ,createdAt:new Date()
},
]

export const guests = [[{
    name:"JohnDoe",
    email:"john doe@gmail.com"
},{
    name:"Mary Ann",
    email:"Mary@gmail.com"
},{
    name:"Priscilla Amani",
    email:"Priscilla@gmail.com"
},{
    name:"Markus Alonzo",
    email:"Markus@gmail.com"
},
],
[{
    name:"JohnDoe",
    email:"john doe@gmail.com"
},{
    name:"Mary Ann",
    email:"Mary@gmail.com"
},{
    name:"Priscilla Amani",
    email:"Priscilla@gmail.com"
},{
    name:"Markus Alonzo",
    email:"Markus@gmail.com"
},
],
[{
    name:"JohnDoe",
    email:"john doe@gmail.com"
},{
    name:"Mary Ann",
    email:"Mary@gmail.com"
},{
    name:"Priscilla Amani",
    email:"Priscilla@gmail.com"
},{
    name:"Markus Alonzo",
    email:"Markus@gmail.com"
},
],
[{
    name:"JohnDoe",
    email:"john doe@gmail.com"
},{
    name:"Mary Ann",
    email:"Mary@gmail.com"
},{
    name:"Priscilla Amani",
    email:"Priscilla@gmail.com"
},{
    name:"Markus Alonzo",
    email:"Markus@gmail.com"
},
],
]


export const validateEvent = ({ date,title,description,categoryId,venueId,isPublic,day,city,imageUrl,changeErr})=>{
console.log(date,title,description,categoryId,venueId,isPublic,day,city,imageUrl,changeErr);
    if(!date || !title || !description || !categoryId || !venueId || !day || !city || !imageUrl){
        changeErr({msg:"All fields are required",show:true,type:"warning"})
        console.log("here");
        return false
    }
    if(description.length < 200){
        console.log("here");
        changeErr({msg:"Description must be atleast 200 characters",show:true,type:"warning"})
        return false
    }
    return true
}