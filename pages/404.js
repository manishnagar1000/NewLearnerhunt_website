

export default function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    
    </div>
  );
}


export const getStaticProps = () => {
  return {
    redirect: {
      destination: '/',
    },
  };
};