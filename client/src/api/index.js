import axios from "axios";

axios.defaults.baseURL = "/graphql";
axios.defaults.method = "POST";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("X-AUTH");
axios.defaults.headers.post["Content-Type"] = "application/json";

export const signupUser = async (userData) => {
  try {
    const { data } = await axios({
      data: {
        query: `mutation {
        signUp(
          fields: {
            email: "${userData.email}"
            password: "${userData.password}" 
          }
        ) {
          _id
          email
          token
        }
      }`,
      },
    });

    return {
      auth: data.data ? data.data.signUp : null,
      errors: data.errors,
    };
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (userData) => {
  try {
    const { data } = await axios({
      data: {
        query: `
          mutation {
            authUser(
            fields: {
              email: "${userData.email}"
              password: "${userData.password}" 
            }
            ){
              _id
              email
              token
            }
          }
        `,
      },
    });

    return {
      auth: data.data ? data.data.authUser : null,
      errors: data.errors,
    };
  } catch (error) {
    console.log(error);
  }
};

export const autoSignIn = async () => {
  try {
    const { data } = await axios({
      data: {
        query: `
          query {
            isAuth {
              _id
              email
              token
            }
          }
        `,
      },
    });

    if (data.errors) localStorage.removeItem("X-AUTH");

    return {
      auth: data.data ? data.data.isAuth : null,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateEmailPass = async (email, password, id) => {
  try {
     const { data } = await axios({
      data: {
        query: `
          mutation {
            updateEmailPass(
              email: "${email}"
              password: "${password}"
              _id: "${id}"
            ){
              _id
              token
              email
            }
          }
        `, 
      }
     });

     if (data.data.errors) {
      return { errors: data.errors}
     } else {
      localStorage.setItem('X-AUTH', data.data.updateEmailPass.token);
     }

     return {
      auth: data.data ? data.data.updateEmailPass : null
     }

  } catch(err) { console.log(err); }
}

export const getUserStats = async (id) => {
  try {
    const body = {
      query: `
        query User($id: ID!, $sort: SortInput) {
          user(id: $id) {
            name
            lastname
            posts(sort: $sort) {
              _id, title
            }
            categories {
              name
            }
          }
        }
      `,
      variables: {
        id: id,
        sort: {
          sortBy: "_Id",
          order: "desc",
          limit: 3
        }
      }
    } 
    
    const { data } = await axios({
      data: JSON.stringify(body)
    });

    console.log("IM DATA")
    console.log(data);

    return {
      stats: data.data ? data.data.user : null
    }
  } catch(error) {console.log(error);}
}

export const getCategories = async () => {
  try {
    const body = {
      query: `
        query {
          categories {
            _id
            name
          } 
        }
      `
    }

    const { data } = await axios({data: JSON.stringify(body)});

    return data;
  } catch (error) { console.log(error) }
}

export const createPost = async (post) => {
    try {
      const body = {
        query: `
          mutation CreatePost($fields:PostInput!){
            createPost(fields: $fields){
              _id
              title
            }
          }
        `,
        variables: {
          fields: post
        }
      }

      const { data } = await axios({
        data: JSON.stringify(body)
      })
      
      return {
        createdPost: {
          post: data.data ? data.data.createPost : null,
          error: data.errors
        }
      }
    } catch(error) {console.log(error)}
}

export const getUserPosts = async(sort, prevState, id) => {
  console.log(sort, prevState, id); 
  try {
    const body = {
      query: `
        query GetUserPosts($sort: SortInput, $queryBy: QueryByInput) {
          posts(sort: $sort, queryBy: $queryBy) {
            _id
            title
            status
            category { name }
          }
        }
      `,
      variables: {
        queryBy: {key: "author", value: id},
        sort: sort
      }
    }

    const { data } = await axios({data: JSON.stringify(body)});

    let newState;
    let newPosts = data.data ? data.data.posts : null;

    if(newPosts) {
      newState = [...prevState, ...newPosts];
    }

    return {
      posts: data.data ? newState :  null
    }
  } catch(error) {console.log(error)}
}

export const updatePostStatus = async (status, postId, prevState) => {
  try {
    const body = {
      query: `
        mutation UpdatePost($fields: PostInput!, $postId: ID!) {
          updatePost(fields: $fields, postId: $postId) {
            _id
            title
            status
            category { name }
          }
  
        }
      `,
       variables: {
        postId: postId,
        fields: {status: status}
       } 
    }
    const { data } = await axios({data: JSON.stringify(body)});

    let newState = null;
    let updPost = data.data ? data.data.updatePost : null;

    if(updPost) {
      newState = prevState.map(oldObj => {
        return [updPost].find( newObj => newObj._id === oldObj._id) || oldObj
      });
    }

    return {
      posts: data.data ? newState : prevState
    }

  }  catch(error) {console.log(error)}
}

export const removePost = async (postId, prevState) => {
  try {
    const body = {
      query: `
        mutation {
          deletePost(
            postId: "${postId}"
          ){
            _id
          }  
        }
      `
    }

    const { data } = await axios({data: JSON.stringify(body)});

    let newState = null;
    let delPost = data.data ? data.data.deletePost : null;

    if(delPost) {
      newState = prevState.filter(obj => {return obj._id !== delPost._id})
    }

    return {
      posts: data.data ? newState : prevState
    }

  }  catch(error) {console.log(error)}
}
