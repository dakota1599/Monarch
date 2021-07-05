

const HeaderComponent = (props: {
  website: { name: string; path: string };
  links: { name: string; path: string }[];
  className: string;
}) => {


  //This decides if it shows the login or logout buttons.
  var log =
    window.localStorage.getItem("username") === null ? (
      <a href="/">
        <span className="glyphicon glyphicon-log-in"></span> Login
      </a>
    ) : (
      <a href="/" onClick={() => {window.localStorage.clear()}}>
        <span className="glyphicon glyphicon-log-in"></span> Log out
      </a>
    );
  
  return (
    <nav className={"navbar " + props.className}>
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#myNavbar"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href={props.website.path}>
            {props.website.name}
          </a>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            {props.links.map((item, index) => (
              <li key={index}>
                <a href={item.path}>{item.name}</a>
              </li>
            ))}
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              {log}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
