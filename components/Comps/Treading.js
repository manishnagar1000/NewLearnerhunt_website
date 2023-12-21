import React from "react";

function Treading() {
  const traderData = [
    // 1
    {
      trader: "rakesh-jhunjhunwala",
      investments: [ "Aptech Ltd."//APTECHT Avarage but when down IT IS A FLUCTUATE SHARE //short term
      , "	Autoline Industries Ltd." // AUTOIND Good but when down IT IS A GROWING SHARE //long term
      , "Bilcare Ltd."  // BI Avarage but when down IT IS A FLUCTUATE SHARE //short term
      , "DB Realty Ltd." // DBREALTY Good but when down IT IS A GROWING SHARE //long term
      , "Dishman Carbogen Amcis Ltd." //DCAL Avarage but when down IT IS A FLUCTUATE SHARE //short term
      , "Edelweiss Financial Services Ltd."//EDELWEIS Avarage but when down IT IS A FLUCTUATE SHARE //short term
        // done page 2 (A-E)
      , "Fortis Healthcare Ltd."// FORTIS Good but when down IT IS A GROWING SHARE //long term
      , "Indiabulls Real Estate Ltd."// IBREALEST Avarage but when down IT IS A FLUCTUATE SHARE //short term
    
      // done page 3 (F-J)
      , "Karur Vysya Bank Ltd."// KARURVYSYA Good but when down IT IS A GROWING SHARE //long term (GREAT)
      , "Man InfraConstruction Ltd."// MININFRA Good but when down IT IS A GROWING SHARE //long term (GREAT)
      , "NCC Ltd."// KARURVYSYA Good but when down IT IS A GROWING SHARE //long term (GREAT)
      , "Orient Cement Ltd."// ORIENTCEM Good but when down IT IS A GROWING SHARE //long term (GREAT)
      // done page 4 (K-O)

      , "Rallis India Ltd."// RALLIS Avarage but when down IT IS A FLUCTUATE SHARE //short term
      // done page 5 (P-T)

    ],
    },
    // 3
    {
      trader: "Vijay Kedia",
      investments: [ 
        // done page 2 (A-E)no data is 200 point 
        "Heritage Foods Ltd.",
      "Innovators Facade Systems Ltd.", 
      // done page 3 (F-J)
      "Lykis Ltd.", "Om Infra Ltd.",
      // done page 4 (K-O)
      "Patel Engineering Ltd.","Precision Camshafts Ltd.",
       "Talbros Automotive Components Ltd.",
      // done page 5 (P-T)
       "Vaibhav Global Ltd.",
      // done page 6 (U-Z)

     ],
    },
    // 4
    {
      trader: "Radhakishan Damani",
      investments:[
        "Advani Hotels & Resorts (India) Ltd.",
      "Aptech Ltd.",
        // done page 2
      // done page 3 (F-J)
        "Metropolis Healthcare Ltd.",
      // done page 4 (K-O)
      ,"Sundaram Finance Holdings Ltd"//SUNDARMHLD Good but when down IT IS A GROWING SHARE //long term 

      // done page 5 (P-T)
        ,"United Breweries Ltd.",
        "VST Industries Ltd."
      // done page 6 (U-Z)
      ],
    },
    // 5
    {
      trader: "Ashish Dhawan",
      investments:[
        "Glenmark Pharmaceuticals Ltd.",
        "Greenlam Industries Ltd.",
        "IDFC Ltd.",
      // done page 3 (F-J)
      ],
    },
    // 6
    {
      trader: "Mohnish Pabrai",
      investments:[
      "Edelweiss Financial Services Ltd."//EDELWEIS Avarage but when down IT IS A FLUCTUATE SHARE //short term

        // done page 2 (A-E)
      // done page 3 (F-J)
      // done page 4 (K-O)

        ,"Rain Industries Ltd.",
      // done page 5 (P-T)

      ],
    },
   
    // 8
    {
      trader: "Mukul Agrawal",
      investments:[
        "Allcargo Gati Ltd.",
        "Allcargo Logistics Ltd.",
        "Delta Corp Ltd.",
        "Dhabriya Polywood Ltd.",
        "Dishman Carbogen Amcis Ltd.",
        // done page 2 (A-E)

        "Goldiam International Ltd.",
        "Indo Count Industries Ltd.(ICIL)",
        "Jet Freight Logistics Ltd.",
        "JTEKT India Ltd.",
      // done page 3 (F-J)

        "Kamdhenu Ltd.",
        , "Karur Vysya Bank Ltd."// KARURVYSYA Good but when down IT IS A GROWING SHARE //long term
        ,"LT Foods Ltd.",
        "Mitcon Consultancy & Engineering Services Ltd.",
        "Onmobile Global Ltd.",
      // done page 4 (K-O)

        "Parag Milk Foods Ltd.",
        "PE Analytics Ltd.",
        "Sahyadri Industries Ltd.",
        "Sarda Energy & Minerals Ltd.",
        "Tracxn Technologies Ltd.",
        "Thomas Cook (India) Ltd.",
      // done page 5 (P-T)

        "Vasa Denticity Ltd."
      // done page 6 (U-Z)

      ]
    },
    // 9
    {
      trader: "Abakkus Fund - Sunil Singhania",
      investments:[
        "ADF Foods Ltd.",
        "EMS Ltd.",
        "DCM Shriram Industries Ltd.",
        // done page 2
        "IIFL Securities Ltd.",
      // done page 3 (F-J)
      // done page 4 (K-O)

        "PSP Projects Ltd.",
        "Rajshree Polypack Ltd.",
        "Route Mobile Ltd.",
        "Sarda Energy & Minerals Ltd.",
        "Rupa & Company Ltd.",
        "Siyaram Silk Mills Ltd.",
        "Technocraft Industries (India) Ltd.",
        "The Anup Engineering Ltd.",
        "Tracxn Technologies Ltd.",

      // done page 5 (P-T)
      ]
    },
    // 10
    {
      trader: "Ashish Kacholia",
      investments:[
        "Dhabriya Polywood Ltd.",
        "ADF Foods Ltd.",
        // done page 2 (A-E)
        "Goldiam International Ltd.",

      // done page 3 (F-J)
        "NIIT Ltd.",
      // done page 4 (K-O)
        "PCBL Ltd.",
        "Safari Industries (India) Ltd.",
        "Sastasundar Ventures Ltd.",
        "Shaily Engineering Plastics Ltd.",
        "SJS Enterprises Ltd.",
        "Stove Kraft Ltd.",
        "TARC Ltd.",
      // done page 5 (P-T)

        "Vaibhav Global Ltd.",
        "Vasa Denticity Ltd.",
      // done page 5 (U-Z)


      ]
    },
    // Common share
    {
      trader: "Common share",
      investments:[
        "Aptech Ltd(124)"//APTECHT Avarage but when down IT IS A FLUCTUATE SHARE //short term
      ,"ADF Foods Ltd"////TRACXN Good but when down IT IS A GROWING SHARE //long term (EXPENSIVE)
      , "Dishman Carbogen Amcis Ltd (18)." //DCAL Avarage but when down IT IS A FLUCTUATE SHARE //short term
      , "Edelweiss Financial Services Ltd (16)."//EDELWEIS Avarage but when down IT IS A FLUCTUATE SHARE //short term
      , "Karur Vysya Bank Ltd."// KARURVYSYA Good but when down IT IS A GROWING SHARE //long term
      ,"Sundaram Finance Holdings Ltd"//SUNDARMHLD Good but when down IT IS A GROWING SHARE //long term 
      ,"Dhabriya Polywood Ltd.",//DHABRIYA Good but when down IT IS A GROWING SHARE //long term 
      ,"Goldiam International Ltd"//GOLDIAM Good but when down IT IS A GROWING SHARE //long term 
      ,"Sarda Energy & Minerals Ltd.",//SARDAEN Good but when down IT IS A GROWING SHARE //long term 
      ,"Tracxn Technologies Ltd"//TRACXN Good but when down IT IS A GROWING SHARE //long term 
      ,"Vaibhav Global Ltd"//VAIBHAVGBL Good but when down IT IS A GROWING SHARE //long term (EXPENSIVE
    ]
    }
  ];

  function findMatchingCompanies(data) {
    const allCompanies = data.reduce((companies, trader) => {
      trader.investments.forEach((company) => {
        if (!companies.includes(company)) {
          companies.push(company);
        }
      });
      return companies;
    }, []);

    const matchingCompanies = allCompanies.filter((company) => {
      const isPresentInAllTraders = data.every((trader) =>
        trader.investments.includes(company)
      );
      console.log(isPresentInAllTraders);
      if (isPresentInAllTraders) {
        console.log(company); // Log the company if it's present in all traders
      }
      if (isPresentInAllTraders == false) {
        console.log(company);
      }
      return !isPresentInAllTraders;
    });

    return matchingCompanies;
  }

  const matchedCompanies = findMatchingCompanies(traderData);

  return (
    <div>
      <h1>Matching Companies:</h1>
      <ul>
        {matchedCompanies.map((company, index) => (
          <li key={index}>{company}</li>
        ))}
      </ul>
      {/* <ul>
        {matchedCompanies.map((company, index) => (
          <li key={index}>{company}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default Treading;
