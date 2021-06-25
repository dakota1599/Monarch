const HeaderComponent = (props: {
  website: { name: string; path: string };
  links: { name: string; path: string }[];
  className: string;
}) => {
  console.log(props.links);
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
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
