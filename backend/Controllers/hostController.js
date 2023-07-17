const hostModel = require('../Model/hostHelper');

exports.addProperty = (req, res) => {
  const formData = req.body;
  const images = req.files;
  const filenames = images.map(file => file.filename);
  formData.imageFilenames = filenames;

  hostModel.addProperty(formData)
    .then(() => {
      res.status(200).json('ok');
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
};

exports.getHostedProperty = (req, res) => {
  hostModel.getHostedProperty(req.body)
    .then((response) => {
      const updatedResponse = response.map(item => {
        const updatedImageFilenames = item.imageFilenames.map(filename => {
          return `https://htron.site/api/images/${filename}`;
        });
        return { ...item, imageFilenames: updatedImageFilenames };
      });
      res.status(200).json(updatedResponse);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
};

exports.editHostedProperty = (req, res) => {
  const data = {
    PropertyName: req.body.PropertyName,
    Description: req.body.Description,
    VehicleType: req.body.VehicleType,
    Address: req.body.Address,
    Price: req.body.Price,
    Available: req.body.Available
  };

  if (!req.files.length == 0) {
    const matchedElements = req.body.oldimages.filter(element => req.body.images.includes(element));
    const modifiedUrls = matchedElements.map(url => url.substring("https:/htron.site/api/images/".length));

    req.files.map(file => {
      const modifiedFilename = file.filename;
      modifiedUrls.push(modifiedFilename);
    });

    data.imageFilenames = modifiedUrls;
  }

  hostModel.editProperty(req.body.Propertid, data)
    .then(() => {
      res.status(200).json('ok');
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
};
