import Link from "next/link";

const SourceIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    className="mt-0.5"
    viewBox="0 0 411 512.07"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M410.93 485.29c0 7.44-3 14.1-7.85 18.94-4.83 4.83-11.5 7.84-18.82 7.84H26.79c-7.32 0-14.12-3.01-18.94-7.84C3 499.39 0 492.73 0 485.29V26.78c0-7.45 3-14.11 7.85-18.95C12.67 3 19.33 0 26.79 0h230.03c4.57 0 8.76 2.08 11.49 5.49l131.85 128.37c6.27 1.7 10.84 7.58 10.84 14.37 0 112.36-.07 224.65-.07 337.06zm-205.7-238.9c1.8-7.73 9.54-12.54 17.28-10.75 7.73 1.8 12.54 9.54 10.74 17.28l-31.19 133.54c-1.79 7.74-9.53 12.55-17.27 10.75-7.73-1.8-12.54-9.54-10.74-17.27l31.18-133.55zm68.26 128.66c-5.97 5.21-15.04 4.61-20.26-1.36-5.22-5.96-4.61-15.03 1.35-20.25l42.24-37.01-42.24-37.01c-5.96-5.22-6.57-14.29-1.35-20.26 5.22-5.96 14.29-6.57 20.26-1.35l54.46 47.72c.51.44 1 .92 1.46 1.45 5.21 5.96 4.61 15.03-1.36 20.25l-54.56 47.82zm-117.07-21.61c5.96 5.22 6.57 14.29 1.35 20.25-5.22 5.97-14.29 6.57-20.26 1.36l-54.56-47.82c-5.97-5.22-6.57-14.29-1.35-20.25.45-.53.94-1.01 1.45-1.45l54.46-47.72c5.97-5.22 15.04-4.61 20.26 1.35 5.22 5.97 4.61 15.04-1.35 20.26l-42.24 37.01 42.24 37.01zm224.66-187.3H256.82c-8.36 0-15.03-6.8-15.03-15.03V29.78H29.93v452.37h351.19c0-105.37-.04-210.65-.04-316.01zM271.72 52.39l89.5 83.82h-89.5V52.39z" />
  </svg>
);

const EmailIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 24 24"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const GithubIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    viewBox="0 0 16 16"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const MastodonIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    viewBox="0 0 74 79"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M73.7014 17.9592C72.5616 9.62034 65.1774 3.04876 56.424 1.77536C54.9472 1.56019 49.3517 0.7771 36.3901 0.7771H36.2933C23.3281 0.7771 20.5465 1.56019 19.0697 1.77536C10.56 3.01348 2.78877 8.91838 0.903306 17.356C-0.00357857 21.5113 -0.100361 26.1181 0.068112 30.3439C0.308275 36.404 0.354874 42.4535 0.91406 48.489C1.30064 52.498 1.97502 56.4751 2.93215 60.3905C4.72441 67.6217 11.9795 73.6395 19.0876 76.0945C26.6979 78.6548 34.8821 79.0799 42.724 77.3221C43.5866 77.1245 44.4398 76.8953 45.2833 76.6342C47.1867 76.0381 49.4199 75.3714 51.0616 74.2003C51.0841 74.1839 51.1026 74.1627 51.1156 74.1382C51.1286 74.1138 51.1359 74.0868 51.1368 74.0592V68.2108C51.1364 68.185 51.1302 68.1596 51.1185 68.1365C51.1069 68.1134 51.0902 68.0932 51.0695 68.0773C51.0489 68.0614 51.0249 68.0503 50.9994 68.0447C50.9738 68.0391 50.9473 68.0392 50.9218 68.045C45.8976 69.226 40.7491 69.818 35.5836 69.8087C26.694 69.8087 24.3031 65.6569 23.6184 63.9285C23.0681 62.4347 22.7186 60.8764 22.5789 59.2934C22.5775 59.2669 22.5825 59.2403 22.5934 59.216C22.6043 59.1916 22.621 59.1702 22.6419 59.1533C22.6629 59.1365 22.6876 59.1248 22.714 59.1191C22.7404 59.1134 22.7678 59.1139 22.794 59.1206C27.7345 60.2936 32.799 60.8856 37.8813 60.8843C39.1036 60.8843 40.3223 60.8843 41.5447 60.8526C46.6562 60.7115 52.0437 60.454 57.0728 59.4874C57.1983 59.4628 57.3237 59.4416 57.4313 59.4098C65.3638 57.9107 72.9128 53.2051 73.6799 41.2895C73.7086 40.8204 73.7803 36.3758 73.7803 35.889C73.7839 34.2347 74.3216 24.1533 73.7014 17.9592ZM61.4925 47.6918H53.1514V27.5855C53.1514 23.3526 51.3591 21.1938 47.7136 21.1938C43.7061 21.1938 41.6988 23.7476 41.6988 28.7919V39.7974H33.4078V28.7919C33.4078 23.7476 31.3969 21.1938 27.3894 21.1938C23.7654 21.1938 21.9552 23.3526 21.9516 27.5855V47.6918H13.6176V26.9752C13.6176 22.7423 14.7157 19.3795 16.9118 16.8868C19.1772 14.4 22.1488 13.1231 25.8373 13.1231C30.1064 13.1231 33.3325 14.7386 35.4832 17.9662L37.5587 21.3949L39.6377 17.9662C41.7884 14.7386 45.0145 13.1231 49.2765 13.1231C52.9614 13.1231 55.9329 14.4 58.2055 16.8868C60.4017 19.3772 61.4997 22.74 61.4997 26.9752L61.4925 47.6918Z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    viewBox="0 0 24 24"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    viewBox="0 0 24 24"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
  </svg>
);

const CcIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    viewBox="5.5 -3.5 64 64"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M37.441-3.5c8.951 0 16.572 3.125 22.857 9.372 3.008 3.009 5.295 6.448 6.857 10.314 1.561 3.867 2.344 7.971 2.344 12.314 0 4.381-.773 8.486-2.314 12.313-1.543 3.828-3.82 7.21-6.828 10.143-3.123 3.085-6.666 5.448-10.629 7.086-3.961 1.638-8.057 2.457-12.285 2.457s-8.276-.808-12.143-2.429c-3.866-1.618-7.333-3.961-10.4-7.027-3.067-3.066-5.4-6.524-7-10.372S5.5 32.767 5.5 28.5c0-4.229.809-8.295 2.428-12.2 1.619-3.905 3.972-7.4 7.057-10.486C21.08-.394 28.565-3.5 37.441-3.5zm.116 5.772c-7.314 0-13.467 2.553-18.458 7.657-2.515 2.553-4.448 5.419-5.8 8.6a25.204 25.204 0 0 0-2.029 9.972c0 3.429.675 6.734 2.029 9.913 1.353 3.183 3.285 6.021 5.8 8.516 2.514 2.496 5.351 4.399 8.515 5.715a25.652 25.652 0 0 0 9.943 1.971c3.428 0 6.75-.665 9.973-1.999 3.219-1.335 6.121-3.257 8.713-5.771 4.99-4.876 7.484-10.99 7.484-18.344 0-3.543-.648-6.895-1.943-10.057-1.293-3.162-3.18-5.98-5.654-8.458-5.146-5.143-11.335-7.715-18.573-7.715zm-.401 20.915-4.287 2.229c-.458-.951-1.019-1.619-1.685-2-.667-.38-1.286-.571-1.858-.571-2.856 0-4.286 1.885-4.286 5.657 0 1.714.362 3.084 1.085 4.113.724 1.029 1.791 1.544 3.201 1.544 1.867 0 3.181-.915 3.944-2.743l3.942 2c-.838 1.563-2 2.791-3.486 3.686-1.484.896-3.123 1.343-4.914 1.343-2.857 0-5.163-.875-6.915-2.629-1.752-1.752-2.628-4.19-2.628-7.313 0-3.048.886-5.466 2.657-7.257 1.771-1.79 4.009-2.686 6.715-2.686 3.963-.002 6.8 1.541 8.515 4.627zm18.457 0-4.229 2.229c-.457-.951-1.02-1.619-1.686-2-.668-.38-1.307-.571-1.914-.571-2.857 0-4.287 1.885-4.287 5.657 0 1.714.363 3.084 1.086 4.113.723 1.029 1.789 1.544 3.201 1.544 1.865 0 3.18-.915 3.941-2.743l4 2c-.875 1.563-2.057 2.791-3.541 3.686a9.233 9.233 0 0 1-4.857 1.343c-2.896 0-5.209-.875-6.941-2.629-1.736-1.752-2.602-4.19-2.602-7.313 0-3.048.885-5.466 2.658-7.257 1.77-1.79 4.008-2.686 6.713-2.686 3.962-.002 6.783 1.541 8.458 4.627z" />
  </svg>
);

const CcByIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    viewBox="5.5 -3.5 64 64"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M37.443-3.5c8.988 0 16.57 3.085 22.742 9.257C66.393 11.967 69.5 19.548 69.5 28.5c0 8.991-3.049 16.476-9.145 22.456-6.476 6.363-14.113 9.544-22.912 9.544-8.649 0-16.153-3.144-22.514-9.43C8.644 44.784 5.5 37.262 5.5 28.5c0-8.761 3.144-16.342 9.429-22.742C21.101-.415 28.604-3.5 37.443-3.5zm.114 5.772c-7.276 0-13.428 2.553-18.457 7.657-5.22 5.334-7.829 11.525-7.829 18.572 0 7.086 2.59 13.22 7.77 18.398 5.181 5.182 11.352 7.771 18.514 7.771 7.123 0 13.334-2.607 18.629-7.828 5.029-4.838 7.543-10.952 7.543-18.343 0-7.276-2.553-13.465-7.656-18.571-5.104-5.104-11.276-7.656-18.514-7.656zm8.572 18.285v13.085h-3.656v15.542h-9.944V33.643h-3.656V20.557c0-.572.2-1.057.599-1.457.401-.399.887-.6 1.457-.6h13.144c.533 0 1.01.2 1.428.6.417.4.628.886.628 1.457zm-13.087-8.228c0-3.008 1.485-4.514 4.458-4.514s4.457 1.504 4.457 4.514c0 2.971-1.486 4.457-4.457 4.457s-4.458-1.486-4.458-4.457z" />
  </svg>
);

const FooterComponent = () => {
  return (
    <footer className="mt-8 mb-4">
      <hr className="mb-4" />
      <div className="flex flex-wrap justify-between">
        <p className="text-sm my-1">
          © 2022-2023{" "}
          <Link
            href="/"
            {...{ "xmlns:dct": "http://purl.org/dc/terms/" }}
            property="dct:title"
            rel="cc:attributionURL"
          >
            pscoleman.me/
          </Link>{" "}
          by{" "}
          <span
            {...{ "xmlns:cc": "http://creativecommons.org/ns#" }}
            property="cc:attributionName"
          >
            Patrick Coleman
          </span>
        </p>
        <div className="flex items-center my-1">
          <p className="text-sm my-0">Source code: </p>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 space-x-1 fill-text-light dark:fill-text-darkbold hover:fill-accent-light dark:hover:fill-accent-dark"
            href="https://github.com/patrickscoleman/pscoleman-blog"
            passHref
          >
            <SourceIcon />
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="flex items-center my-1">
          <p className="text-sm my-0">
            License:{" "}
            <Link
              target="_blank"
              rel="license noopener noreferrer"
              href="http://creativecommons.org/licenses/by/4.0/"
            >
              CC BY 4.0
            </Link>
          </p>
          <Link
            target="_blank"
            rel="license noopener noreferrer"
            className="flex items-center ml-1 space-x-1 fill-text-light dark:fill-text-darkbold hover:fill-accent-light dark:hover:fill-accent-dark"
            href="http://creativecommons.org/licenses/by/4.0/"
            passHref
          >
            <CcIcon />
            <CcByIcon />
          </Link>
        </div>
        <div className="flex items-center my-1">
          <p className="text-sm my-0">Where else to find me: </p>
          <span className="flex flex-wrap items-center">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 space-x-1 fill-text-light dark:fill-text-darkbold hover:fill-accent-light dark:hover:fill-accent-dark"
              href={"mailto:"}
              passHref
            >
              <EmailIcon />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 space-x-1 fill-text-light dark:fill-text-darkbold hover:fill-accent-light dark:hover:fill-accent-dark"
              href="https://github.com/patrickscoleman"
              passHref
            >
              <GithubIcon />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 space-x-1 fill-text-light dark:fill-text-darkbold hover:fill-accent-light dark:hover:fill-accent-dark"
              href="https://mstdn.social/@patrickscoleman"
              passHref
            >
              <MastodonIcon />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 space-x-1 fill-text-light dark:fill-text-darkbold hover:fill-accent-light dark:hover:fill-accent-dark"
              href="https://twitter.com/patrickscoleman"
              passHref
            >
              <TwitterIcon />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 space-x-1 fill-text-light dark:fill-text-darkbold hover:fill-accent-light dark:hover:fill-accent-dark"
              href="https://www.linkedin.com/in/patrickscoleman/"
              passHref
            >
              <LinkedInIcon />
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export const Footer = FooterComponent;
