import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
  <div
    style={{
      background: 'pink',
      height: '90px',
      marginBottom: '3rem',
      borderBottom: '2px solid #e6e6e6',
    }}
  >
    <div
      style={{
     
        margin: '0 auto',
        maxWidth: 980,
        padding: '1.45rem 1.0875rem',
      }}
   >
     <h1 style={{marginTop: '15px', textAlign: 'center',fontSize: '70px'}}>
        <Link to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
IN // OUT        </Link>
      </h1>
    </div>
  </div>
);

export default Header
