const MapOuter = () => {
  return (
    <div className="mapouter">
      <div className="gmap_canvas">
        <iframe
          width="100%"
          height={400}
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=-18.89806,%2047.5664&t=k&z=17&ie=UTF8&iwloc=&output=embed"
          frameBorder={0}
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
        />
        <a href="https://123movies-to.org" />
        <br />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n                .mapouter {\n                  position: relative;\n                  text-align: right;\n                  height: 400px;\n                  width: 100%;\n                }\n              ",
          }}
        />
        <a href="https://www.embedgooglemap.net">
          embed google map in wordpress
        </a>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n                .gmap_canvas {\n                  overflow: hidden;\n                  background: none !important;\n                  height: 400px;\n                  width: 100%;\n                }\n              ",
          }}
        />
      </div>
    </div>
  );
};

export default MapOuter;
