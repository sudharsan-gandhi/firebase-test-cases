"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mock = {
    "company": {
        "fields": {
            "avatar": "url",
            "dob": "text",
            "email": "text",
            "gender": ["Woman", "Man", "Transgender", "Other"],
            "interests": {
                "personal": {
                    "Age": ["21 or more", "28 or more", "38 or more", "45 or more", "55 or more"],
                    "alcohol": ["Sometimes", "Regularly", "Never"],
                    "children": ["None, want some", "Have, want more", "Have, don't want more", "None, don't want", "None, ok with yours", "Have, ok with yours"],
                    "exercise": ["Never", "Sometimes", "Yes"],
                    "gender": ["Woman", "Man", "Transgender", "Other"],
                    "looking for": ["Woman", "Man", "Everyone"],
                    "orientation": ["Straight", "Other"],
                    "politics": ["Not political", "Progressive", "Conservative", "Undecided"],
                    "relationship_type": ["Casual", "Relationship", "Don't know", "Marriage"],
                    "religion": ["Christian", "Muslim", "Buddhism", "Spritual", "Agnostic", "Atheist", "other"],
                    "smoke": ["Never", "Trying to quit", "Sometimes", "yes"],
                    "status": ["single", "seperated", "married", "open", "looking for friends"]
                }
            },
            "mobile": "text",
            "name": "text",
            "personal": "boolean",
            "professional": "boolean",
            "profile": {
                "personal": {
                    "about": "text",
                    "activities": "text",
                    "music": "text",
                    "request_message": "Hi!! I'd like to add you as my friend!!"
                },
                "professional": {
                    "about": "text",
                    "request_message": "Hi!! I'd like to add you as my friend!!"
                }
            },
            "state": "text"
        },
        "patterns": {
            "swift": {
                "avatar": "((?:http|https)://)?(?:www\\\\.)?[\\\\w\\\\d\\\\-_]+\\\\.\\\\w{2,3}(\\\\.\\\\w{2})?(/(?<=/)(?:[\\\\w\\\\d\\\\-./_]+)?)?",
                "email": "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]{2,64}"
            }
        }
    },
    "users": {
        "3kQFEZoivmWgKQGQLtIzqGsA2I73": {
            "avatar": "gs://icebrekr-development.appspot.com/3kQFEZoivmWgKQGQLtIzqGsA2I73.png",
            "dob": "30-03-1997",
            "email": "madhunarmi@gmail.com",
            "gender": "female",
            "mobile": "+91-999-437-9390",
            "name": "madhuvanthi hemanathan",
            "personal": false,
            "professional": true,
            "profile": {
                "personal": {
                    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                    "activities": "Gym, Cycling, Travelling",
                    "music": "rap, country, jazz",
                    "request_message": "Hi!! I'd like to add you as my friend!!"
                },
                "professional": {
                    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                    "request_message": "Hi!! I'd like to add you as my friend!!"
                }
            },
            "state": "Tamilnadu,IN"
        },
        "dnVuE9AOMHdJyuLWDJMlCD8UxB03": {
            "dob": "21-03-1992",
            "email": "immran@email.com",
            "gender": "male",
            "mobile": "+91-999-437-1234",
            "name": "immran",
            "personal": true,
            "professional": true,
            "profile": {
                "personal": {
                    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                    "activities": "Gym, Cycling, coding",
                    "music": "melody, reggae",
                    "request_message": "Hi!! I'd like to add you as my friend!!"
                },
                "professional": {
                    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                    "request_message": "Hi!! I'd like to add you as my friend!!"
                }
            },
            "state": "Andhra pradesh,IN"
        },
        "eEAuTUsIbRc4mbWDJsV5t8E3YCg2": {
            "dob": "30-04-1994",
            "email": "sudharsangandhi@gmail.com",
            "gender": "male",
            "mobile": "+91-999-437-9390",
            "name": "sudharsan gandhi",
            "personal": true,
            "professional": true,
            "profile": {
                "personal": {
                    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                    "activities": "Gym, Cycling, Travelling",
                    "music": "rap, country, jazz",
                    "request_message": "Hi!! I'd like to add you as my friend!!"
                },
                "professional": {
                    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                    "request_message": "Hi!! I'd like to add you as my friend!!"
                }
            },
            "state": "Tamilnadu,IN"
        }
    }
};
//# sourceMappingURL=data.js.map