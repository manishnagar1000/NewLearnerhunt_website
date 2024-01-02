import React from "react";

function Treading() {
  const traderData = [
    {
      trader: "rakesh-jhunjhunwala",
      investments: [
        "IDFC",
    ],
    },
    {
      trader: "Vijay Kedia",
      investments: [ 
        "irfc",
        "Asian paints",
        "hal",
        "Tata motors",
        "Cdsl",
        "Hdfc bank",
        "tata power",
     ],
    },
    {
      trader: "Radhakishan Damani",
      investments:[
        "IDFC",
        "Idfc first bank",
        "Tata power"
      ],
    },
    {
      trader: "Ashish Dhawan",
      investments:[
        "Reliance",
        "Tcs",
        "Mazagon",
        "Asian paints",
        "Titan",
        "itc",
      ],
    },
    {
      trader: "Mohnish Pabrai",
      investments:[
      "Tata motors",
      "Bajaj finance",
      "Tata elxsi",
      "HAL",
      "Reliance",
      "Hdfc bank",
      ],
    },
    {
      trader: "Mukul Agrawal",
      investments:[
"Tata Motors",
"Asian Paint ",
"Bajaj Finance",
"Mazagon Dock Shipbuilder",
"Avenue Supermarts",
"Polycab India",
"TCS",
"Varun Beverages ",
"Reliance Industries",
      ]
    },
    {
      trader: "Abakkus Fund - Sunil Singhania",
      investments:[
        "Tata Power",
        "Tata Motors",
        "Wipro",
        "Reliance Industries",
        "IRFC",
      ]
    },
    {
      trader: "Ashish Kacholia",
      investments:[
         "Sardean",
"HSCL",
"J& K Bank",
"MRPL",
"HBL Power",
"JSW Infra",
"Jio Finance",
"Exide industries",
"tata power",
"Kalyan jewellers",
      ]
    },
    {
      trader: "shubha",
      investments:[
      "Asian paints",
      "Avenue supermarts", 
      "PI Industries",
      "Bajaj finance",
      
    ]
    },
    {
      ader: "sdfdsf",
      investments:[
        "Tata steel",
        "Itc",
        'Wipro',
        'Tata power',
    ]
    },
    {
      ader: "sdfdsfdsfdsfsf",
      investments:[
 ,     "CDSL"
 ,     "PolyCab"
 ,     "Titan"
 ,     "Varun beverage"
 ,     "Tata motors"
 ,       "Hal"
 ,   ]
    }
  ];

  function findMatchingCompanies(data) {
    console.log(data)
    const allCompanies = data.reduce((companies, trader) => {
      trader.investments.forEach((company) => {
        if (!companies.includes(company)) {
          companies.push(company.toLowerCase());
        }
      });
      return companies;
    }, []);

    console.log(allCompanies)

    const matchingCompanies = allCompanies.filter((company) => {
      const isPresentInAllTraders = data.every((trader) =>
        trader.investments.includes(company)
      );
      console.log(isPresentInAllTraders);
      if (isPresentInAllTraders) {
        console.log(company); // Log the company if it's present in all traders
      }
     
      return isPresentInAllTraders;
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
