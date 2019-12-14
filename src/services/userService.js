const userService = {

    userData: function (id) {        
        return fetch(`http://localhost:9999/api/user/profile/${id}`, {  
          
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
         
        }).then(res => res.json())
        
      },

      favourite: function (data, id) {
        return fetch(`http://localhost:9999/api/user/favourite/${id}`, {  
           
          body: JSON.stringify(data),
          
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          }
         
        }).then(res => res.json())
        
      },
    create: function (data) {
    return fetch(`http://localhost:9999/api/car/create`, {  
       
      body: JSON.stringify(data),
      
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
     
    }).then(res => res.json())
    
  },

  getCars: function () {
    return fetch(`http://localhost:9999/api/car/`, {  
      
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
     
    }).then(res => res.json())
    
  },

  logout: function () {
    return fetch(`http://localhost:9999/api/user/logout`, {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.text());
  },

  login: function (data) {
    return fetch(`http://localhost:9999/api/user/login`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include'
    }).then(res => res.text());
  },

  update: function (data, id) {
    return fetch(`http://localhost:9999/api/car/edit/${id}`, {  
       
      body: JSON.stringify(data),
      
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      }
     
    }).then(res => res.json())
    
  },

  details: function (id) {
    return fetch(`http://localhost:9999/api/car/details/${id}`, {  
      
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
     
    }).then(res => res.json())
    
  },

  register: function (data) {
    return fetch(`http://localhost:9999/api/user/register`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json());
  },
};

export default userService;