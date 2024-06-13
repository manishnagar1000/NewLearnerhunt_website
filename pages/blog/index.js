import { useEffect, useState } from "react";
import Classes from "../../styles/blogs.module.css";
import Carousel from "react-multi-carousel";
import Chip from "@mui/material/Chip";
import "react-multi-carousel/lib/styles.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import PaginationItem from "@mui/material/PaginationItem";
import Head from "next/head";



export default function index(blogs) {
  console.log(blogs);
  const [page, setPage] = useState(1);
  const [Post, setPost] = useState(blogs);
  // console.log(blogs.data.categories)

  // const collegeType = [
  //   {
  //     name: "All Categories",
  //     type: "All Categories",
  //   },
  //   {
  //     name: "Accounting",
  //     type: "Accounting",
  //   },
  //   {
  //     name: "Cloud Computing",
  //     type: "cloud",
  //   },

  // ];
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      // partialVisibilityGutter: 50, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      // partialVisibilityGutter: 80, // this is needed to tell the amount of px that should be visible.
      slidestoSlide: 1,
    },
  };
  // const handlePage=(event, newPage)=>{
  //   event.preventDefault()
  //   // setpage()
  //   setPage(newPage);
  //   console.log(newPage);
  //   fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/blog/${newPage}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("userid")}`,
  //     },
  //   }).then(async (response) => {
  //     var res = await response.json();
  //     console.log(res)
  //     setPost(res)

  //   });
  // }
  // const [filteredPosts, setFilteredPosts] = useState([]);
  // useEffect(() => {
  //   if (blogs.data.posts && blogs.data.categories) {
  //     const filtered = blogs.data.posts.filter(post =>
  //       blogs.data.categories.some(category => console.log(category._id))

  //       // blogs.data.categories.some(category => category._id === post.categories)
  //     );
  //     console.log(filtered)
  //     // setFilteredPosts(filtered);
  //   }
  // }, [blogs.data]);

  // const handleTabChange = (type, name) => {
  //   setActive(type);
  //   setNameActive(name);
  //   setSelectedBlogType(type);
  // };

  return (
    <>

      <Head>
        <title>
          Learnerhunt Blogs- Explore All Learning Tips and Knowledge.
        </title>
        <meta
          name="description"
          content="Learnerhunt Blogs: Explore All the Learning Tips and Knowledge That Enhance Your Learning Journey with Valuable Insights and Stay Informed and Empowered."
        />
        <meta
          name="keywords"
          content="Education Blogs, Informational Blogs, Study Related Blogs"
        />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(StructuredDataOrg),
          }} */}
        {/* /> */}
      </Head>
      <div className="container">
        <div className="main">
          <div className={Classes["welcome-box"]}>
            <div className={Classes["welcome-box-content"]}>
              <div className="pb-3">
                <h1 className={Classes["h1Tag"]}>Welcome to our blog</h1>
              </div>
              <p>
                Welcome to our educational blog, Dive into our curated content to expand your knowledge,
                 whether you're a student or a professional. Stay updated with the latest trends and insights, and let's embark on a journey of learning and growth together!
              </p>
            </div>
            {/* <div className={Classes["welcome-box-form"]}>
            <form
              role="search"
              method="get"
              action="https://www.leanerhunt.com/blog/"
            >
              <input
                type="text"
                placeholder="Search topics and Keywords"
                name="s"
                id="s"
                className=""
                required=""
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="d-flex justify-content-center">
            <span>Subscribe to our Newsletter*</span>
          </div> */}
          </div>
          <div className="pt-2">
            <div className={Classes["blogs_main"]}>
              <h2>Categories</h2>
            </div>
            <div className="postion-relative" style={{ textTransform: "capitalize" }}>
              <Carousel
                className={Classes["react-multi-carousel-list"]}
                responsive={responsive}
                partialVisbile={false}
              >
                {Post.data.categories.map((s, i) => {
                  return (
                    <Link key={i} href={s.link}>
                      <Chip label={s.name} color="primary" />
                    </Link>
                  );
                })}
              </Carousel>
            </div>
          </div>
          <div className={Classes["allCategories"]}>
            <h2 className={Classes["Allh2"]}>
              All Blogs:
              <span className={Classes["articlesCount"]}>
                {Post.data.totalRecords}
              </span>
            </h2>
          </div>
        </div>
        <div className=" container py-5">
          <div className={`${Classes["bloglist"]} row`}>
            {Post.data.posts.map((s, i) => (
              <div key={i} className="col-lg-4 col-md-6 col-md-12">
                <div className={`${Classes["card"]} mb-3 p-0 overlay-img`} style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", cursor: "default", borderRadius: "0 0 15px 15px" }}>
                  <div className={Classes["image-box"]}>
                    <Link
                      key={i}
                      className="text-decoration-none text-reset"
                      href={`/blog/${s.slug}`}
                    >
                      <img
                        height={250}
                        width={100}
                        src={`${s.banner_image
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
                      <h2 className={Classes["card-title"]} style={{ textTransform: "capitalize" }}>
                        {s.title}
                      </h2>
                    </a>
                    <div
                      className="my-1"
                      dangerouslySetInnerHTML={{
                        __html:
                          s.content.replace(/<[^>]*>/g, "").slice(0, 70) +
                          (s.content.replace(/<[^>]*>/g, "").length > 70
                            ? "..."
                            : ""),
                      }}
                    >
                      {/* { dangerouslySetInnerHTML={{__html: s.content.split(' ').slice(100).join(' ')}}} */}
                    </div>
                    <div className="card-footer bg-transparent text-muted pb-3 small border-0">
                      <span style={{ fontWeight: "600" }}>Created at : </span>
                      <span style={{ color: "#d36d00" }}>
                        {new Date(s.createdAt)
                          .toLocaleDateString("en-GB")
                          .replaceAll("/", '-')}
                      </span>

                      <br />
                      <span style={{ fontWeight: "600" }}>Categories : </span>
                      {s.categories.map((c, i) => {
                        let data = blogs.data.categories.find(
                          (bc) => bc._id == c
                        ),
                          name = data?.name,
                          link = data?.link;
                        if (i < s.categories.length - 1) {
                          name = " " + name + ", ";
                        }
                        return (
                          <>
                            {
                              name ?
                                <a style={{ textDecoration: 'none', textTransform: "capitalize" }} href={link}>
                                  {name}
                                </a>
                                :
                                <span style={{ color: "red" }}>
                                  Category not found
                                </span>
                            }
                          </>
                        );
                      })}
                      {/* <a className="text-muted" href="/blog/category/tax-preparation">
        , Tax Preparation
      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`${Classes["pagination-blog"]}`}>
            <Stack spacing={2}>
              <Pagination
                page={page}
                count={Post.data.totalPages}
                color="primary"
                renderItem={(item) => {
                  // console.log(item);
                  return (
                    <Link href={`/blog/page/${item.page}`}>
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
  );
}

export async function getServerSideProps() {
  try {
    const blogs_res = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/blog/1"
    );
    const blogs = await blogs_res.json();
    console.log(blogs);
    return { props: blogs };
  } catch (error) {
    throw error;
  }
}
