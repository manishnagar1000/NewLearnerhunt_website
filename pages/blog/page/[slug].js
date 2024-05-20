import { useEffect, useState } from "react";
import Classes from "/styles/blogs.module.css";
import Carousel from "react-multi-carousel";
import Chip from "@mui/material/Chip";
import "react-multi-carousel/lib/styles.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import PaginationItem from "@mui/material/PaginationItem";
import { useRouter } from "next/router";

export default function Page(blogs) {
    const router = useRouter();
  const {slug} = router.query;
  console.log(slug)
  console.log(blogs);
  const [page, setPage] = useState(slug);
  const [Post, setPost] = useState(blogs);
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
  
  return (
    <div className="container">
      <div className="main">
        <div className={Classes["welcome-box"]}>
          <div className={Classes["welcome-box-content"]}>
            <div className="pb-3">
              <h1 className={Classes["h1Tag"]}>Welcome to our blog</h1>
            </div>
            <p>
              Your personal space to feed your curiosity and stay up-to-date
              with accounting, tax, the cloud, and everything that comes with
              it!
            </p>
          </div>
          <div className={Classes["welcome-box-form"]}>
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
          </div>
        </div>
        <div className="pt-2">
          <div className={Classes["blogs_main"]}>
            <h2>Categories</h2>
          </div>
          <div className="postion-relative">
            <Carousel
              className={Classes["react-multi-carousel-list"]}
              responsive={responsive}
              partialVisbile={false}
            >
              {blogs.data.categories.map((s, i) => {
                return (
                  <Link href={s.link}>
                    <Chip key={i} label={s.name} color="primary" />
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
              {blogs.data.totalRecords}
            </span>
          </h2>
        </div>
      </div>
      <div className=" container py-5">
        <div className={`${Classes["bloglist"]} row`}>
          {blogs.data.posts.map((s) => (
            <div className="col-lg-4 col-md-6 col-md-12">
              <div className={`${Classes["card"]} p-0 rounded-0 overlay-img`}>
                <div className={Classes["image-box"]}>
                  <Link
                    className="text-decoration-none text-reset"
                    href={`/blog/${s.slug}`}
                  >
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
                    <h2 className={Classes["card-title"]}>
                      {s.title.charAt(0).toUpperCase() + s.title.slice(1)}
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
                    {/* { dangerouslySetInnerHTML={{__html: s.content.split(' ').slice(100).join(' ')}}} */}
                  </div>
                  <div className="card-footer bg-transparent text-muted pb-3 small border-0">
                    {new Date(s.updatedAt)
                      .toLocaleDateString("en-GB")
                      .split("/")
                      .reverse()
                      .join(" / ")}

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
                        <a className="text-muted" href={link}>
                          {name}
                        </a>
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
              page={Number(slug)}
              count={blogs.data.totalPages}
              color="primary"
              renderItem={(item) => {
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
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const blogs_res = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/blog/${slug}`
    );
    const blogs = await blogs_res.json();
    console.log(blogs);
    return { props: blogs };
  } catch (error) {
    throw error;
  }
}
