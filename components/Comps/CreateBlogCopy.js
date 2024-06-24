import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Card, CardBody, Form, Input, Label, Button, Container } from "react-bootstrap"

const CreateBlog = () => {
	const editor = useRef(null);
    // const [categories, setCategories] = useState([])

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    })

	

//   const API_URL = "https://bestmbacollegeinbangalore.com/api"
//   const UPLOAD_ENDPOINT ="admin/blog/upload-image";

//   function uploadAdapter(loader){
//       return{
//           upload:()=>{
//               return new Promise((resolve,reject)=>{
//                   const body =  new FormData();
//                   loader.file.then((file)=>{
//                       body.append("img",file);
//                       fetch(`${API_URL}/${UPLOAD_ENDPOINT}`,{
//                           method:"post",
//                           body:body

//                       }).then((res=>res.json())
//                       .then((res)=>{
//                           console.log(res)
//                           resolve({default:`${API_URL}/${res.url}`})
//                       })
//                       .catch((err)=>{
//                           reject(err)
//                       }))
//                   })
//               })
//           }
//       }
//   }

//   function uploadPlugin(editor){
//       editor.plugins.get('FileRepository').createUploadAdaptor = (loader)=>{
//           return uploadAdapter(loader)
//       }
//   }

//   const getCategoryList = ()=> {
//     fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/admin/blog-category`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("pt")}`,
//       },
//     }).then(async (res) => {
//       console.log(res)
//       let response = await res.json();
//       // console.log(response);
//       if (response.data) {
//         if (response.data.length > 0) {
//             setCategories(response.data)
//         }
//       } else {
//         Swal.fire({
//           title: "error",
//           html: `${response.error}`,
//           icon: "error",
//           confirmButtonText: "Ok",
//         })
//       }
//     });
//   }

//  useEffect(() => {
//     getCategoryList()
//  }, [])
 
    //field changed function
    const fieldChanged = (event) => {
        // console.log(event)
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    // const contentFieldChanaged = (data) => {

    //     setPost({ ...post, 'content': data })


    // }

     //handling file chagne event
    //  const handleFileChange=(event)=>{
    //     console.log(event.target.files[0])
    //     setImage(event.target.files[0])
    // }
     //create post function
     const createPost = (event) => {

        event.preventDefault();

        // console.log(post)
        // if (post.title.trim() === '') {
        //     toast.error("post  title is required !!")
        //     return;
        // }

        // if (post.content.trim() === '') {
        //     toast.error("post content is required !!")
        //     return
        // }

        // if (post.categoryId === '') {
        //     toast.error("select some category !!")
        //     return;
        // }


        // //submit the form one server
        // post['userId'] = user.id
        // doCreatePost(post).then(data => {


        //     uploadPostImage(image,data.postId).then(data=>{
        //         toast.success("Image Uploaded !!")
        //     }).catch(error=>{
        //         toast.error("Error in uploading image")
        //         console.log(error)
        //     })



        //     toast.success("Post Created !!")
        //     // console.log(post)
        //     setPost({
        //         title: '',
        //         content: '',
        //         categoryId: ''
        //     })
        // }).catch((error) => {
        //     toast.error("Post not created due to some error !!")
        //     // console.log(error)
        // })

    }
	return (
        <div className="wrapper">
        <Card className="shadow-sm  border-0 mt-2">
            <CardBody>
                {/* {JSON.stringify(post)} */}
                <h3>What going in your mind ?</h3>
                <Form onSubmit={createPost}>
                    <div className="my-3">
                        <Label for="title" >Post title</Label>
                        <Input
                            type="text"
                            id="title"
                            placeholder="Enter here"
                            className="rounded-0"
                            name="title"
                            onChange={fieldChanged}
                        />
                    </div>

                    <div className="my-3">
                        <Label for="content" >Post Content</Label>
                        <JoditEditor
                            ref={editor}
                            value={post.content}

                            onChange={(newContent) => contentFieldChanaged(newContent)}
                        />
                    </div>

                    {/* file field  */}

                    <div className="mt-3">
                        <Label for="image">Select Post banner</Label>
                        <Input id="image" type="file" onChange={handleFileChange} />
                    </div>




                    {/* <div className="my-3">
                        <Label for="category" >Post Category</Label>
                        <Input
                            type="select"
                            id="category"
                            placeholder="Enter here"
                            className="rounded-0"
                            name="categoryId"
                            onChange={fieldChanged}
                            defaultValue={0}

                        >

                            <option disabled value={0} >--Select category--</option>

                            {

                                categories.map((category) => (
                                    <option value={category.categoryId} key={category.categoryId}>
                                        {category.categoryTitle}
                                    </option>
                                ))

                            }



                        </Input>
                    </div> */}



                    <Container className="text-center">
                        <Button type="submit" className="rounded-0" color="primary">Create Post</Button>
                        <Button className="rounded-0 ms-2" color="danger">Reset Content</Button>
                    </Container>


                </Form>


            </CardBody>

        </Card>




    </div>
	);
};

export default CreateBlog;