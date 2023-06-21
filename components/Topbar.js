import React, { useEffect, useState } from "react";
import Classes from "/styles/common.module.css";
import Link from "next/link";

const navbarList = [
  {
    name: "QuickBooks Hosting",
    href: "/quickbooks-hosting",
    children: [
      {
        name: "QuickBooks Pro Hosting",
        href: "/quickbooks-pro-hosting",
      },
      {
        name: "QuickBooks Premier Hosting",
        href: "/quickbooks-premier-hosting",
      },
      {
        name: "QuickBooks Enterprise Hosting",
        href: "/quickbooks-enterprise-hosting",
      },
      {
        name: "QuickBooks POS Hosting",
        href: "/quickbooks-pos-hosting",
      },
      {
        name: "QuickBooks Add-ons Hosting",
        href: "/quickbooks-add-ons-hosting",
      },
      {
        name: "Buy QuickBooks",
        href: "/buy-quickbooks-license",
      },
    ],
  },
  {
    name: "Sage Hosting",
    href: "/sage-hosting",
    children: [
      {
        name: "Sage 50 Hosting",
        href: "/sage-50-hosting",
      },
      {
        name: "Sage 100 ERP Hosting",
        href: "/sage-100-erp-hosting",
      },
      {
        name: "Sage 300 ERP Hosting",
        href: "/sage-300-erp-hosting",
      },
      {
        name: "Sage 500 ERP Hosting",
        href: "/sage-500-erp-hosting",
      },
    ],
  },
  {
    name: "Tax Software Hosting",
    href: "/tax-software-hosting",
    children: [
      {
        name: "Drake Tax Software Hosting",
        href: "/drake-tax-software-hosting",
      },
      {
        name: "UltraTax CS Hosting",
        href: "/ultratax-cs-hosting",
      },
      {
        name: "Lacerte Hosting",
        href: "/lacerte-hosting",
      },
      {
        name: "ProSeries Tax Software Hosting",
        href: "/proseries-taxsoftware-hosting",
      },
      {
        name: "TaxWise Hosting",
        href: "/taxwise-hosting",
      },
    ],
  },
  {
    name: "Other Services",
    href: "-1",
    children: [
      {
        name: "Small Business",
        href: "/small-business-hosting",
      },
      {
        name: "Law Firm Hosting",
        href: "/law-firms-hosting",
      },
      {
        name: "Virtual Desktop",
        href: "/virtual-desktop",
      },
    ],
  },
  {
    name: "Resources",
    href: "-1",
    children: [
      {
        name: "Support",
        href: "https://www.thesagenext.com/support/",
      },
      {
        name: "Status Page",
        href: "https://status.thesagenext.com/",
      },
      {
        name: "About Us",
        href: "/about-us",
      },
      {
        name: "Blog",
        href: "/blog",
      },
    ],
  },
];
const mobNavbarList = [
  {
    name: "QuickBooks",
    href: "-1",
    children: [
      {
        name: "QuickBooks Hosting",
        href: "/quickbooks-hosting",
      },
      {
        name: "QuickBooks Pro Hosting",
        href: "/quickbooks-pro-hosting",
      },
      {
        name: "QuickBooks Premier Hosting",
        href: "/quickbooks-premier-hosting",
      },
      {
        name: "QuickBooks Enterprise Hosting",
        href: "/quickbooks-enterprise-hosting",
      },
      {
        name: "QuickBooks POS Hosting",
        href: "/quickbooks-pos-hosting",
      },
      {
        name: "QuickBooks Add-ons Hosting",
        href: "/quickbooks-add-ons-hosting",
      },
      {
        name: "Buy QuickBooks",
        href: "/buy-quickbooks-license",
      },
    ],
  },
  {
    name: "Sage Solutions",
    href: "-1",
    children: [
      {
        name: "Sage Hosting",
        href: "/sage-hosting",
      },
      {
        name: "Sage 50 Hosting",
        href: "/sage-50-hosting",
      },
      {
        name: "Sage 100 ERP Hosting",
        href: "/sage-100-erp-hosting",
      },
      {
        name: "Sage 300 ERP Hosting",
        href: "/sage-300-erp-hosting",
      },
      {
        name: "Sage 500 ERP Hosting",
        href: "/sage-500-erp-hosting",
      },
    ],
  },
  {
    name: "Tax Software",
    href: "-1",
    children: [
      {
        name: "Tax Software Hosting",
        href: "/tax-software-hosting",
      },
      {
        name: "Drake Tax Software Hosting",
        href: "/drake-tax-software-hosting",
      },
      {
        name: "UltraTax CS Hosting",
        href: "/ultratax-cs-hosting",
      },
      {
        name: "Lacerte Hosting",
        href: "/lacerte-hosting",
      },
      {
        name: "ProSeries Tax Software Hosting",
        href: "/proseries-taxsoftware-hosting",
      },
      {
        name: "TaxWise Hosting",
        href: "/taxwise-hosting",
      },
    ],
  },
  {
    name: "Other Services",
    href: "-1",
    children: [
      {
        name: "Small Business",
        href: "/small-business-hosting",
      },
      {
        name: "Law Firm Hosting",
        href: "/law-firms-hosting",
      },
      {
        name: "Virtual Desktop",
        href: "/virtual-desktop",
      },
    ],
  },
  {
    name: "Resources",
    href: "-1",
    children: [
      {
        name: "Support",
        href: "https://www.thesagenext.com/support/",
      },
      {
        name: "Status Page",
        href: "https://status.thesagenext.com/",
      },
      {
        name: "About Us",
        href: "/about-us",
      },
    ],
  },
];

const Topbar = () => {
  const [isWindowScroll, setIsWindowScroll] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  const [screenWidth, setsCreenWidth] = useState(1200);
  const [selectedSmList, setSelectedSmList] = useState("");
  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      if (windowHeight > 150) {
        setIsWindowScroll(true);
      } else {
        setIsWindowScroll(false);
      }
    }
  };
  useEffect(() => {
    setsCreenWidth(screen.width);
    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const getSideList = (list, isMob) => {
    return list.map((el) => {
      if (el.children != undefined) {
        return (
          <li className={`${Classes["sage-menu-list"]}`} key={el.name}>
            <div
              className={` ${Classes["dwp-icon"]} d-flex justify-content-between align-items-center`}
              onClick={() => {
                if (selectedSmList == el.name) {
                  setSelectedSmList("");
                } else {
                  setSelectedSmList(el.name);
                }
              }}
            >
              {el.href != -1 ? (
                // <Link href={el.href}>
                <a href={el.href}>{el.name}</a>
              ) : (
                // </Link>
                <span style={{ cursor: "pointer" }}>{el.name}</span>
              )}
              {isMob ? (
                <img
                  src="/assets/images/01/down-arrow.svg"
                  alt=""
                  className={`${selectedSmList == el.name ? Classes["dwp-img"] : ""
                    }`}
                  width={11}
                  height={7}
                />
              ) : null}
            </div>
            <ul
              className={`${Classes["drop-down-menu"]} ${isMob && selectedSmList == el.name
                  ? Classes["mob-dropdown"]
                  : ""
                }`}
            >
              {getSideList(el.children, isMob)}
            </ul>
          </li>
        );
      } else {
        return (
          <li key={el.name}>
            <Link href={el.href}>{el.name}</Link>
          </li>
        );
      }
    });
  };
  // console.log(getSideList(navbarList, 1));
  return (
    <>
      {screenWidth > 1199 ? (
        <>
          {/* Top header start */}
          <div className={`${Classes["top-header"]}`}>
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <p className={`${Classes["top-header-para"]}`}>
                    <img
                      loading="lazy"
                      src="/assets/images/topbar/support.svg"
                      className="me-1"
                      alt="support"
                      width={12}
                      height={14}
                    />
                    Sales/Support +91-8800756846
                  </p>
                </div>

                <div className="col-9">
                  <marquee>
                    <Link className="text-decoration-none" href="https://www.google.com/search?q=iit+hyderabad+jee+advanced+cut+off&oq=IIT+hyderabad+jee+advanced+cut+off&gs_lcrp=EgZjaHJvbWUqCQgAECMYJxiKBTIJCAAQIxgnGIoFMggIARAAGBYYHtIBCDExMzhqMGo5qAIAsAIA&sourceid=chrome&ie=UTF-8">
                      <p className={`${Classes["top-header-para"]}`}>
                        <span className={`${Classes["top-header-news"]}`}>
                          News :-
                        </span>
                        IIT hyderabad jee advanced cut off
                      </p>
                    </Link>
                  </marquee>
                </div>
              </div>
            </div>
          </div>
          {/* Top header end */}

          {/* sage logo start */}
          {/* This Section is hiding */}
          {/* <div className={`${Classes["Sage-logo"]}`}>
            <div className="container">
              <div className="row">
                <div className="col-xl-6">
                  <div className={`${Classes["sage-logo"]}`}>
                    {!isWindowScroll && (
                      <Link href="/">
                        <img
                          loading="lazy"
                          src="/assets/images/Svglogo.svg"
                          alt="sagenext logo"
                          width={176}
                          height={50}
                        />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className={`${Classes["sage-logo-menu"]}`}>
                    <ul type="none">
                      <li>
                        <Link href="https://portal.thesagenext.com/login">
                          My Acount
                        </Link>
                      </li>
                      <li>
                        <Link href="https://www.thesagenext.com/blog/">
                          Blog
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* This Section is hiding */}
          {/* sage logo end */}

          {/* Sage Menu start */}
          <div
            className={`${Classes["sage-menu"]} ${isWindowScroll ? Classes["sage-sticky-menu"] : ""
              }`}
          >
            <div className={` ${Classes["con-large"]} container `}>
              <div className={`${Classes["sage-menu-container"]}`}>
                <div className={`${Classes["sage-sticky-logo"]}`}>
                  {/* {isWindowScroll && (
                    <Link href="/">
                      <img
                        loading="lazy"
                        src="/assets/images/Svglogo.svg"
                        alt="sagenext logo"
                        width={176}
                        height={50}
                      />
                    </Link>
                  )} */}
                  <Link href="/">
                    <img
                      loading="lazy"
                      src="/assets/images/Svglogo.svg"
                      alt="sagenext logo"
                      width={176}
                      height={50}
                    />
                  </Link>
                </div>
                <div className={`${Classes["sage-menu-item"]}`}>
                  <ul>
                    {/* {getSideList(navbarList)} */}
                    <li className={`${Classes["sage-menu-list"]}`}>
                      <Link href="/">Home</Link>
                    </li>
                    <li className={`${Classes["sage-menu-list"]}`}>
                      <Link href="/colleges">Colleges</Link>
                    </li>
                    <li className={`${Classes["sage-menu-list"]}`}>
                      <Link href="/courses">Courses</Link>
                    </li>
                    <li className={`${Classes["sage-menu-list"]}`}>
                      <Link href="/exams">Exams</Link>
                    </li>
                    <li className={`${Classes["sage-menu-list"]}`}>
                      <Link href="/comingsoon">Study Abroad</Link>
                    </li>
                  </ul>
                </div>
                <div className={`${Classes["contact-cta"]}`}>
                  {/* <Link href="#">Sign In</Link>&nbsp; */}
                  <Link href="/contact-us">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Sage Menu end */}
        </>
      ) : (
        <>
          <div
            className={`${Classes["sage-menu"]} ${isWindowScroll ? Classes["sage-sticky-menu"] : ""
              }`}
          >
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div className={`${Classes["sage-logo"]}`}>
                    <Link href="/">
                      <img
                        loading="lazy"
                        src="/assets/images/Svglogo.svg"
                        alt="sagenext logo"
                        width={176}
                        height={50}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-6">
                  <div className={`${Classes["sage-toggle-icon"]} text-end`}>
                    <img
                      loading="lazy"
                      onClick={() => setShowToggleMenu(!showToggleMenu)}
                      src="/assets/images/topbar/toggle-icon.svg"
                      alt=""
                      width={25}
                      height={25}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={Classes["sm-menu"]}>
            <div
              className={`${Classes["toggle-menu-container"]} ${showToggleMenu ? Classes["show"] : ""
                }`}
            >
              <div
                className={`${Classes["left-toggle-menu"]}`}
                onClick={() => setShowToggleMenu(!showToggleMenu)}
              ></div>
              <div className={`${Classes["right-toggle-menu"]}`}>
                <div className={`${Classes["top-toggle-menu"]}`}>
                  <div className={`${Classes["sage-flex"]}`}>
                    <ul>
                      <li onClick={() => setShowToggleMenu(!showToggleMenu)}>
                        <Link href="/contact-us">Contact US</Link>
                      </li>
                      {/* <li>
                        <Link href="#">Sign-In</Link>
                      </li> */}
                    </ul>

                    <span onClick={() => setShowToggleMenu(!showToggleMenu)}>
                      <img
                        loading="lazy"
                        src="/assets/images/topbar/Cancel-Icon.svg"
                        alt=""
                      />
                    </span>
                  </div>
                  <div className={`${Classes["sage-toggle-menu-list"]}`}>
                    {/* <ul>{getSideList(mobNavbarList, 1)}</ul> */}
                    <ul>
                      <li onClick={() => setShowToggleMenu(!showToggleMenu)} className={`${Classes["sage-menu-list"]}`}>
                        <Link href="/">Home</Link>
                      </li>
                      <li onClick={() => setShowToggleMenu(!showToggleMenu)} className={`${Classes["sage-menu-list"]}`}>
                        <Link href="/colleges">Colleges</Link>
                      </li>
                      <li onClick={() => setShowToggleMenu(!showToggleMenu)} className={`${Classes["sage-menu-list"]}`}>
                        <Link href="/courses">Courses</Link>
                      </li>
                      <li onClick={() => setShowToggleMenu(!showToggleMenu)} className={`${Classes["sage-menu-list"]}`}>
                        <Link href="/exams">Exams</Link>
                      </li>
                      <li onClick={() => setShowToggleMenu(!showToggleMenu)} className={`${Classes["sage-menu-list"]}`}>
                        <Link href="/comingsoon">Study Abroad</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={`${Classes["bottom-toggle-menu"]}`}>
                  {/* <div className={`${Classes["bottom-toggle-menu-list"]}`}>
                    <ul>
                      <li>
                        <Link href="#">
                          <>
                            <img
                              loading="lazy"
                              src="/assets/images/topbar/my-account.svg"
                              alt=""
                              width={19}
                              height={23}
                            />
                            My Account
                          </>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <>
                            <img
                              loading="lazy"
                              src="/assets/images/topbar/blog.svg"
                              alt=""
                              width={18}
                              height={23}
                            />
                            Blog
                          </>
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                  <hr className="my-sm-4" />
                  <div className={`${Classes["bottom-toggle-menu-cta"]}`}>
                    <div className="mt-2">
                      <span> Sales/Support </span>
                      <br /> <br />
                      <a href="tel:+1-855-922-7243">
                        <span> +91-8800756846</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* jhvnjvn */}
        </>
      )}
    </>
  );
};

export default Topbar;
