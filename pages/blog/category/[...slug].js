import { useEffect, useState } from "react";
import Classes from "../../../styles/blogs.module.css";
import Carousel from "react-multi-carousel";
import Chip from "@mui/material/Chip";
import "react-multi-carousel/lib/styles.css";
import Pagination from "@mui/material/Pagination";
import { notFound } from 'next/navigation'
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import { useRouter } from "next/router";
  import Link from "next/link";
export default function categorySlug(blogs) {
  const router = useRouter();
const { slug } = router.query;
// console.log(slug);
//   console.log(blogs)
  let pageNumber = 1;

  // Extract the page number from the slug if available
  if (slug && slug.length > 1 && !isNaN(parseInt(slug[1]))) {
    pageNumber = parseInt(slug[1]);
  }
  // const [page, setPage] = useState()
  const [categoryPost,setCategoryPost] = useState(blogs)
  // const handlePage=(event, newPage)=>{
  //   event.preventDefault()
  //   // setpage()
  //   setPage(newPage);
  //   console.log(newPage);
  //   fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/blog-category?slug=${slug}&page=${newPage}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("userid")}`,
  //     },
  //   }).then(async (response) => {
  //     var res = await response.json();
  //     console.log(res)
  //     setCategoryPost(res)
      
  //   });
  // }
  return (
    <>
    <div className={Classes['main-category']}>
      <section className={`${Classes["blog-category-list"]} pt-5 pb-5`}>
        <div className="container">
          <div className="row">
        <h1 className=" text-white">Category : <span style={{textTransform:"capitalize"}}>{slug}</span></h1>
        </div>
        </div>
      </section>
      <div className=" container py-5">
        <div className={`${Classes["bloglist"]} row`}>
          {blogs.data.posts.length>0?blogs.data.posts.map((s,i) => (
            <div key={i} className="col-lg-4 col-md-6 col-md-12">
              <div key={i} className={`${Classes["card"]} p-0 overlay-img` } style={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",cursor:"default",borderRadius:"0 0 15px 15px"}}>
                <div className={Classes["image-box"]}>
                  <Link className="text-decoration-none text-reset" href={`/blog/${s.slug}`}>
                    <img
                      height={250}
                      width={100}
                      src={`${
                        s.banner_image
                          ? "https://learnerhunt-assets.s3.us-east-1.amazonaws.com/" +
                            s.banner_image
                          : "/assets/images/blog/DummyBlogSquare.webp"
                      }`}
                      className="card-img-top"
                      alt={s._id}
                    />
                  </Link>
                </div>
                <div className={`${Classes["card-body"]} pb-0`}>
                  <a className={Classes["card_link"]} href={`/blog/${s.slug}`}>
                    <h2 className={Classes["card-title"]} style={{textTransform:"capitalize"}}>
                        {s.title}
                      </h2>
                  </a>
                  <div
                    className="my-1"
                    dangerouslySetInnerHTML={{
                      __html:
                        s.content.replace(/<[^>]*>/g, "").slice(0, 100) +
                        (s.content.replace(/<[^>]*>/g, "").length > 100
                          ? "..."
                          : ""),
                    }}
                  >
                  </div>
                  <div className="card-footer bg-transparent text-muted pb-3 small border-0">
                  <span style={{ fontWeight: "600" }}>Created at : </span>
                      <span style={{ color: "#d36d00" }}>
                        {new Date(s.createdAt)
                          .toLocaleDateString("en-GB")
                          .replaceAll("/", '-')}
                      </span>
                  </div>
                </div>
              </div>
            </div>
          ))
          :<p style={{textIndent:'50px',textAlign:'justify',letterSpacing:'3px'}}>There is no post category</p>
        }
        </div>
        <div className={`${Classes["pagination-blog"]}`}>
          <Stack spacing={2}>
          <Pagination
              page={pageNumber}
              count={blogs.data.totalPages}
              color="primary"
              renderItem={(item) => {
                const linkHref = `/blog/category/${slug[0]}/${item.page>1?item.page:""}`;
                return (
                  <Link href={linkHref}>
                    <PaginationItem {...item} />
                  </Link>
                );
              }}
            />
          </Stack>
        </div>
      </div>
      
      </div>
    </>
  )

  }


  // export async function getServerSideProps(context) {
  //   const { slug} = context.params;
  //   console.log(slug)
  
  //   try {
  //     const blogs_res = await fetch(
  //       process.env.NEXT_PUBLIC_API_ENDPOINT + `/blog-category?slug=${slug}&page=1`
  //     );
  //     const blogs = await blogs_res.json();
  //     return { props: blogs };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  export async function getServerSideProps(context) {
    const { slug } = context.params;
    let page = 1; // Default to page 1
  
    // Check if the last segment of the slug represents a page number
    const lastSegment = slug[slug.length - 1];
    const pageNumber = parseInt(lastSegment);
    if (!isNaN(pageNumber)) {
      // If it's a valid number, use it as the page number
      page = pageNumber;
      // Remove the last segment from the slug
      slug.pop();
    }
  
    try {
      const blogs_res = await fetch(
        process.env.NEXT_PUBLIC_API_ENDPOINT + `/blog-category?slug=${slug.join('/')}&page=${page}`
      );
      const blogs = await blogs_res.json();
      return { props: blogs };
    } catch (error) {
      throw error;
    }
  }