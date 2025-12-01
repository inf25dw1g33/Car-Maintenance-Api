const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const ownerRoutes = require('./api/owners');
const vehicleRoutes = require('./api/vehicles');
const serviceTypeRoutes = require('./api/serviceTypes');
const serviceRecordRoutes = require('./api/serviceRecords');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const openapiDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.use('/api/owners', ownerRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/service-types', serviceTypeRoutes);
app.use('/api/service-records', serviceRecordRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

app.listen(port, () => {
  console.log(`Car Maintenance API a ouvir em http://localhost:${port}`);
});
