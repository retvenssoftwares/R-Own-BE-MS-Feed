# R-own-BE
Here is the list of all the apis that are created till now:  
#### 1. Create Mesibo user:  
##### API URL: http://64.227.150.47/usercreate  
##### HEADERS and BODY of API:   
##### Host: calculated when request is sent  
##### Content-Type: application/json  
##### Content-length: calculated when request is sent  
##### Connection: keep-alive  
Request:  
{  
"Address": "Your_Address_for_mesibo"  
}  
Response:  
{  
    "uid": uid(auto-generated),  
    "address": "your_address",  
    "token": "your_token"  
}

Documentation of API:  
* This is a POST API which creates a Mesibo user using an attribute ADDRESS in req. body and returns a json response containing UID, Address and token.  
References:https://mesibo.com/documentation/tutorials/get-started/create-users/  
https://mesibo.com/documentation/api/backend-api/
#### 2. Get Mesibo User: 
##### API URL: http://64.227.150.47/users  
##### HEADERS and BODY of API:   
##### Host: calculated when request is sent  
##### Content-Type: application/json  
##### Content-length: calculated when request is sent  
##### Connection: keep-alive  
Response:  
{  
    "userscount": total_no_of_users,  
    "count": count,  
    "users": [  
        {  
            "uid": uid(auto-generated),  
            "address": "Address_of_user",  
            "ipaddr": IP_address,  
            "lastonline": "online_status",  
            "active": 1,  
            "pinned": 1,  
            "online": 0,  
            "flag": 0,  
            "flags": 0,  
            "token": "User_token",  
            "appid": "your_app_id"  
        },  
}  

Documentation of API:  
References:https://mesibo.com/documentation/tutorials/get-started/create-users/  
https://mesibo.com/documentation/api/users-and-profiles/
- This is a GET API which returns all registered users in Mesibo.
#### 3. Send notification using Firebase:  
##### API URL: http://64.227.150.47/notify  
##### HEADERS and BODY of API:   
##### Host: calculated when request is sent  
##### Content-Type: application/json  
##### Content-length: calculated when request is sent  
##### Connection: keep-alive  

Request:    
{  
  "registrationTokens":["Your device token"],  
  "t":"Title",  
  "b":"message"  
    
}  
Response:  
{  
    "success": true,    
    "responses": [  
        "projects/r-own-backend/messages/0:1681030364306643%26beb9fa26beb9fa"  
    ]  
}  
Documentation:  
* This is a POST API which sends a notification as a message to the device.  
#### 4. User Profile Creation:  
##### API URL: http://64.227.150.47/profile  
##### HEADERS and BODY of API:   
##### Host: calculated when request is sent  
##### Content-Type: application/json  
##### Content-length: calculated when request is sent  
##### Connection: keep-alive 
Request:
{
User_name:"Your_name",  
User_id: "Auto-generated-id"  
Email: "User_email"  
Phone: "User_phone_number"    
Profile_pic: "Your_profile_photo_from_gallery"  
}  
Response:  
{  
"message": "Profile created successfully"  
}  
Documentation:  
- This is POST API which creates user's profile by taking Profile Pic, Email, Phone, Name as input in req.body.  
#### 5. Get all registered users:
##### API URL: http://64.227.150.47/profile  
##### HEADERS and BODY of API:   
##### Host: calculated when request is sent  
##### Content-Type: application/json  
##### Content-length: calculated when request is sent  
##### Connection: keep-alive  
Response:  
 {
        "_id": "Your_object_id",  
        "User_name": "Your_name",  
        "User_id": "ID",  
        "Profile_pic": "link_of_your_photo",    
        "Email": "Email",  
        "Phone": Number  
    }  
Documentation:  
* This is a GET API which returns all registered users from database.  

#### 6. Update user profile:  
##### API URL: http://64.227.150.47/update/:id
##### HEADERS and BODY of API:   
##### Host: calculated when request is sent  
##### Content-Type: application/json  
##### Content-length: calculated when request is sent  
##### Connection: keep-alive  
Request:   
{   
Name: "Name_to be updated"  
}  

Documentation:  
* This is a PATCH API which updates a specific user's profile in database by taking an attribute as ID. Put the object id of the user in place of :id in the url to update any field in the record.  

#### 7. Contacts sync api:
##### API URL: http://64.227.150.47/contacts  
##### HEADERS and BODY of API:   
##### Host: calculated when request is sent  
##### Content-Type: application/json  
##### Content-length: calculated when request is sent  
##### Connection: keep-alive  

Request:  
{  
    "User_id": "registered_user's id",   
    "ContactDetails": [  
        {  
            "Name": "contact_name_1",  
            "Number": "contact_phoneno_1",  
            "Email": "email_1",  
            "Company_Name": "Company_name_1"  
        },  
        {  
            "Name": "contact_name_2",  
            "Number": "contact_phoneno_2",  
            "Email": "email_2",  
            "Company_Name": "Company_name_2"  
        }  
    ]  
}  
Response:  
 {  
       "message": "Contacts synched successfully"   
    }  
Documentation:  
* This is a POST API which takes all user's contacts from phone and then these contacts are saved in the contacts collection. For demo purpose, only two contacts are shown but more can be added.  

#### 8. Get the synched contacts of a user using User_id:    
##### API URL: http://64.227.150.47/contacts/:User_id  
##### HEADERS and BODY of API:   
##### Host: calculated when request is sent  
##### Content-Type: application/json  
##### Content-length: calculated when request is sent  
##### Connection: keep-alive  
Response:  
{  
    "User_id": "registered_user's id",   
    "ContactDetails": [  
        {  
            "Name": "contact_name_1",  
            "Number": "contact_phoneno_1",  
            "Email": "email_1",  
            "Company_Name": "Company_name_1"  
        },  
        {  
            "Name": "contact_name_2",  
            "Number": "contact_phoneno_2",  
            "Email": "email_2",  
            "Company_Name": "Company_name_2"  
        }  
    ]  
}  

Documentation:  
* This is a GET API which gets the specific user's synched contacts using the user's User_id. Put the User_id of the user in place of :User_id in the url to fetch the contacts.  

#### 9.  Get the matched contacts of a user with the regsitered users using User_id:    
##### API URL: http://64.227.150.47/details_of/:User_id 
##### HEADERS and BODY of API:   
##### Host: calculated when request is sent  
##### Content-Type: application/json  
##### Content-length: calculated when request is sent  
##### Connection: keep-alive  
Response:  
In the response if there are any matching contacts of the user with the registered users then those records will be fetched from the profile collection.

Documentation:  
* This is a GET API which matches the specific user's synched contacts with the registered users then those records will be fetched. Put the User_id of the user in place of :User_id in the url to fetch the records.  

#### 10. Feed post api:
##### API URL: http://64.227.150.47/post  
##### HEADERS and BODY of API:   
##### Host: calculated when request is sent  
##### Content-Type: application/json  
##### Content-length: calculated when request is sent  
##### Connection: keep-alive  

Request:  
![image](https://user-images.githubusercontent.com/129059785/233956920-8bb9e43d-53af-4fc4-8ae3-7ddf798fd772.png)  
send the user_id, caption and media as shown in this above image as form data. Likes, comments will be initially empty.  
Response:  
 {  
       "message": "Post Created successfully"   
    }  
Documentation:  
* This is a POST API to upload a post with user_id, caption, and image files to the database. Likes, comments will be initially an empty array.  



