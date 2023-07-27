/* eslint-disable prettier/prettier */
import { Card, Grid, Text } from "@nextui-org/react";
   // eslint-disable-next-line prettier/prettier
export default function Content() {
  const arrayObj = [
    {
      id: 1,
      name: "College Data Number",
      number: localStorage.getItem("collegedata"),
    },
    {
      id: 2,
      name: "Exam Data Number",
      number:  localStorage.getItem("examdata"),
    },
    {
      id: 3,
      name: "Course Data Number",
      number:  localStorage.getItem("coursedata"),
    }
  ]
  return (
    <Grid.Container spacing={2} gap={2}>
{arrayObj.map((item) => (
  <Grid sm={12} md={4} key={item.id}>
        <Card  css={{ mw: "330px" }}>
          <Card.Header>
            <Text b>{item.name}</Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
            <Text>
             {item.number}
            </Text>
          </Card.Body>
          <Card.Divider />
        </Card>
      </Grid>
  ))}
     
    
     </Grid.Container>
  );
}
