import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Button from '../components/Button';
// Styles
import styles from '../styles/Home.module.css'

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'Sorry, but the page you were looking for could not be found.',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
};

interface ErrorProps {
  statusCode: number;
  title?: string;
}

const Error: NextPage<ErrorProps> = ({ statusCode, title }) => {
  switch (statusCode) {
    case 404:
      return (
        <section>
            <div className={styles.errorpage}>
                <p className={styles.errortext}>Whether no this page or this user existed</p>
                <Button title="Home" link="/" />
            </div>
        </section>
      );

    default:
      return (
        <section>
            <div className={styles.errorpage}>
                <p className={styles.errortext}>Whether no this page or this user existed</p>
                <Button title="Home" link="/" />
            </div>
        </section>
      );
  }
};

Error.getInitialProps = ({ res, err }) => {
  let statusCode = 404;
  if (res) return { statusCode: res.statusCode };
  else if (err && err.statusCode) {
    return { statusCode: err.statusCode };
  }
  return { statusCode };
}
 
export default Error;