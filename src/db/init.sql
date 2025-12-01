CREATE DATABASE IF NOT EXISTS car_maintenance;
USE car_maintenance;

CREATE TABLE owners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(30)
);

CREATE TABLE vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  license_plate VARCHAR(20) NOT NULL UNIQUE,
  year INT,
  FOREIGN KEY (owner_id) REFERENCES owners(id)
);

CREATE TABLE service_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255)
);

CREATE TABLE mechanics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100),
  phone VARCHAR(30),
  email VARCHAR(100) UNIQUE
);

CREATE TABLE service_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id INT NOT NULL,
  service_type_id INT NOT NULL,
  service_date DATE NOT NULL,
  mileage_km INT NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  notes TEXT,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  FOREIGN KEY (service_type_id) REFERENCES service_types(id)
);

-- Tabela associativa para relação M:N entre service_records e mechanics
CREATE TABLE service_record_mechanics (
  service_record_id INT NOT NULL,
  mechanic_id INT NOT NULL,
  PRIMARY KEY (service_record_id, mechanic_id),
  FOREIGN KEY (service_record_id) REFERENCES service_records(id) ON DELETE CASCADE,
  FOREIGN KEY (mechanic_id) REFERENCES mechanics(id) ON DELETE CASCADE
);

-- =============================================
-- OWNERS (30 registos)
-- =============================================
INSERT INTO owners (name, email, phone) VALUES
  ('Gonçalo Azevedo', 'goncalo@example.com', '+351910000001'),
  ('Maria Santos', 'maria.santos@example.com', '+351910000002'),
  ('João Pereira', 'joao.pereira@example.com', '+351910000003'),
  ('Ana Silva', 'ana.silva@example.com', '+351910000004'),
  ('Pedro Costa', 'pedro.costa@example.com', '+351910000005'),
  ('Sofia Martins', 'sofia.martins@example.com', '+351910000006'),
  ('Rui Oliveira', 'rui.oliveira@example.com', '+351910000007'),
  ('Inês Ferreira', 'ines.ferreira@example.com', '+351910000008'),
  ('Tiago Rodrigues', 'tiago.rodrigues@example.com', '+351910000009'),
  ('Catarina Almeida', 'catarina.almeida@example.com', '+351910000010'),
  ('Miguel Sousa', 'miguel.sousa@example.com', '+351910000011'),
  ('Beatriz Gomes', 'beatriz.gomes@example.com', '+351910000012'),
  ('André Fernandes', 'andre.fernandes@example.com', '+351910000013'),
  ('Mariana Lopes', 'mariana.lopes@example.com', '+351910000014'),
  ('Diogo Ribeiro', 'diogo.ribeiro@example.com', '+351910000015'),
  ('Carolina Carvalho', 'carolina.carvalho@example.com', '+351910000016'),
  ('Bruno Pinto', 'bruno.pinto@example.com', '+351910000017'),
  ('Marta Teixeira', 'marta.teixeira@example.com', '+351910000018'),
  ('Ricardo Moreira', 'ricardo.moreira@example.com', '+351910000019'),
  ('Leonor Correia', 'leonor.correia@example.com', '+351910000020'),
  ('Hugo Mendes', 'hugo.mendes@example.com', '+351910000021'),
  ('Francisca Nunes', 'francisca.nunes@example.com', '+351910000022'),
  ('Fábio Cardoso', 'fabio.cardoso@example.com', '+351910000023'),
  ('Matilde Araújo', 'matilde.araujo@example.com', '+351910000024'),
  ('Nuno Machado', 'nuno.machado@example.com', '+351910000025'),
  ('Rita Marques', 'rita.marques@example.com', '+351910000026'),
  ('Vasco Cunha', 'vasco.cunha@example.com', '+351910000027'),
  ('Alice Campos', 'alice.campos@example.com', '+351910000028'),
  ('Simão Rocha', 'simao.rocha@example.com', '+351910000029'),
  ('Diana Barbosa', 'diana.barbosa@example.com', '+351910000030');

-- =============================================
-- VEHICLES (30 registos)
-- =============================================
INSERT INTO vehicles (owner_id, brand, model, license_plate, year) VALUES
  (1, 'Volkswagen', 'Golf 7', 'AA-00-AA', 2016),
  (1, 'Toyota', 'Yaris', 'AB-11-CD', 2018),
  (2, 'Renault', 'Clio', 'EF-22-GH', 2015),
  (2, 'Peugeot', '308', 'IJ-33-KL', 2019),
  (3, 'BMW', '320d', 'MN-44-OP', 2014),
  (4, 'Mercedes', 'Classe A', 'QR-55-ST', 2020),
  (5, 'Audi', 'A3', 'UV-66-WX', 2017),
  (6, 'Ford', 'Focus', 'YZ-77-AB', 2016),
  (7, 'Opel', 'Corsa', 'CD-88-EF', 2019),
  (8, 'Seat', 'Ibiza', 'GH-99-IJ', 2018),
  (9, 'Skoda', 'Octavia', 'KL-00-MN', 2021),
  (10, 'Fiat', '500', 'OP-11-QR', 2020),
  (11, 'Citroën', 'C3', 'ST-22-UV', 2017),
  (12, 'Nissan', 'Qashqai', 'WX-33-YZ', 2019),
  (13, 'Honda', 'Civic', 'AB-44-CD', 2016),
  (14, 'Mazda', 'CX-5', 'EF-55-GH', 2021),
  (15, 'Hyundai', 'i30', 'IJ-66-KL', 2018),
  (16, 'Kia', 'Ceed', 'MN-77-OP', 2020),
  (17, 'Volvo', 'V40', 'QR-88-ST', 2017),
  (18, 'Mini', 'Cooper', 'UV-99-WX', 2019),
  (19, 'Dacia', 'Sandero', 'YZ-10-AB', 2022),
  (20, 'Jeep', 'Renegade', 'CD-21-EF', 2020),
  (21, 'Tesla', 'Model 3', 'GH-32-IJ', 2023),
  (22, 'Porsche', 'Cayenne', 'KL-43-MN', 2021),
  (23, 'Land Rover', 'Evoque', 'OP-54-QR', 2019),
  (24, 'Jaguar', 'XE', 'ST-65-UV', 2018),
  (25, 'Alfa Romeo', 'Giulia', 'WX-76-YZ', 2020),
  (26, 'Lexus', 'UX', 'AB-87-CD', 2022),
  (27, 'Toyota', 'Corolla', 'EF-98-GH', 2021),
  (28, 'Volkswagen', 'Polo', 'IJ-09-KL', 2023);

-- =============================================
-- SERVICE TYPES (30 registos)
-- =============================================
INSERT INTO service_types (name, description) VALUES
  ('Mudança de óleo', 'Substituição de óleo de motor e filtro'),
  ('Troca de pneus', 'Troca de pneus de verão/inverno'),
  ('Revisão geral', 'Revisão periódica com check-up completo'),
  ('Substituição de travões', 'Pastilhas e/ou discos de travão'),
  ('Embraiagem', 'Substituição de kit de embraiagem'),
  ('Inspeção periódica', 'Inspeção obrigatória ao veículo'),
  ('Alinhamento de direção', 'Alinhamento e calibração da direção'),
  ('Balanceamento de rodas', 'Balanceamento das quatro rodas'),
  ('Troca de bateria', 'Substituição da bateria do veículo'),
  ('Substituição de correia', 'Correia de distribuição ou acessórios'),
  ('Ar condicionado', 'Recarga e manutenção do AC'),
  ('Troca de filtro de ar', 'Substituição do filtro de ar do motor'),
  ('Troca de filtro de habitáculo', 'Filtro de ar do habitáculo'),
  ('Substituição de velas', 'Velas de ignição'),
  ('Troca de amortecedores', 'Substituição de amortecedores'),
  ('Reparação de escape', 'Reparação ou substituição do sistema de escape'),
  ('Troca de embraiagem', 'Kit completo de embraiagem'),
  ('Diagnóstico eletrónico', 'Leitura de códigos de erro'),
  ('Reparação de motor', 'Reparação geral do motor'),
  ('Troca de radiador', 'Substituição do radiador'),
  ('Substituição de bomba de água', 'Bomba de água do sistema de arrefecimento'),
  ('Troca de líquido de travões', 'Substituição do fluido de travões'),
  ('Troca de líquido de direção', 'Fluido da direção assistida'),
  ('Polimento de faróis', 'Restauro e polimento dos faróis'),
  ('Reparação de vidros', 'Reparação de fissuras no para-brisas'),
  ('Substituição de para-brisas', 'Troca completa do para-brisas'),
  ('Pintura e chapa', 'Reparação de carroçaria e pintura'),
  ('Lavagem completa', 'Lavagem interior e exterior'),
  ('Impermeabilização', 'Tratamento de proteção da pintura'),
  ('Troca de sensor de estacionamento', 'Substituição de sensores de parking');

-- =============================================
-- MECHANICS (30 registos)
-- =============================================
INSERT INTO mechanics (name, specialization, phone, email) VALUES
  ('Carlos Ferreira', 'Motor e Transmissão', '+351920000001', 'carlos.ferreira@oficina.pt'),
  ('António Silva', 'Eletricidade Auto', '+351920000002', 'antonio.silva@oficina.pt'),
  ('Manuel Costa', 'Suspensão e Direção', '+351920000003', 'manuel.costa@oficina.pt'),
  ('José Santos', 'Travões e Segurança', '+351920000004', 'jose.santos@oficina.pt'),
  ('Paulo Oliveira', 'Ar Condicionado', '+351920000005', 'paulo.oliveira@oficina.pt'),
  ('Rui Pereira', 'Diagnóstico Eletrónico', '+351920000006', 'rui.pereira@oficina.pt'),
  ('Fernando Martins', 'Mecânica Geral', '+351920000007', 'fernando.martins@oficina.pt'),
  ('Jorge Almeida', 'Injeção e Combustível', '+351920000008', 'jorge.almeida@oficina.pt'),
  ('Luís Rodrigues', 'Pneus e Alinhamento', '+351920000009', 'luis.rodrigues@oficina.pt'),
  ('Miguel Sousa', 'Carroçaria e Pintura', '+351920000010', 'miguel.sousa@oficina.pt'),
  ('André Gomes', 'Motor Diesel', '+351920000011', 'andre.gomes@oficina.pt'),
  ('Pedro Fernandes', 'Caixas Automáticas', '+351920000012', 'pedro.fernandes@oficina.pt'),
  ('Tiago Lopes', 'Híbridos e Elétricos', '+351920000013', 'tiago.lopes@oficina.pt'),
  ('Bruno Ribeiro', 'Escape e Emissões', '+351920000014', 'bruno.ribeiro@oficina.pt'),
  ('Ricardo Carvalho', 'Mecânica Geral', '+351920000015', 'ricardo.carvalho@oficina.pt'),
  ('Hugo Pinto', 'Eletricidade Auto', '+351920000016', 'hugo.pinto@oficina.pt'),
  ('Nuno Teixeira', 'Motor e Transmissão', '+351920000017', 'nuno.teixeira@oficina.pt'),
  ('Vítor Moreira', 'Suspensão e Direção', '+351920000018', 'vitor.moreira@oficina.pt'),
  ('Sérgio Correia', 'Travões e Segurança', '+351920000019', 'sergio.correia@oficina.pt'),
  ('Marco Mendes', 'Diagnóstico Eletrónico', '+351920000020', 'marco.mendes@oficina.pt'),
  ('Filipe Nunes', 'Ar Condicionado', '+351920000021', 'filipe.nunes@oficina.pt'),
  ('Daniel Cardoso', 'Pneus e Alinhamento', '+351920000022', 'daniel.cardoso@oficina.pt'),
  ('Hélder Araújo', 'Injeção e Combustível', '+351920000023', 'helder.araujo@oficina.pt'),
  ('Joaquim Machado', 'Mecânica Geral', '+351920000024', 'joaquim.machado@oficina.pt'),
  ('Alexandre Marques', 'Motor Diesel', '+351920000025', 'alexandre.marques@oficina.pt'),
  ('Gonçalo Cunha', 'Caixas Automáticas', '+351920000026', 'goncalo.cunha@oficina.pt'),
  ('Rafael Campos', 'Híbridos e Elétricos', '+351920000027', 'rafael.campos@oficina.pt'),
  ('Diogo Rocha', 'Carroçaria e Pintura', '+351920000028', 'diogo.rocha@oficina.pt'),
  ('Fábio Barbosa', 'Escape e Emissões', '+351920000029', 'fabio.barbosa@oficina.pt'),
  ('Simão Reis', 'Eletricidade Auto', '+351920000030', 'simao.reis@oficina.pt');

-- =============================================
-- SERVICE RECORDS (35 registos)
-- =============================================
INSERT INTO service_records (vehicle_id, service_type_id, service_date, mileage_km, cost, notes) VALUES
  (1, 1, '2024-01-15', 120000, 89.90, 'Óleo 5W30 + filtro'),
  (1, 3, '2024-01-15', 120000, 150.00, 'Revisão anual'),
  (1, 2, '2023-11-10', 115000, 320.00, 'Troca de 4 pneus'),
  (1, 6, '2023-09-05', 112000, 30.00, 'Inspeção sem anomalias'),
  (2, 1, '2024-02-20', 60000, 79.00, 'Mudança de óleo e filtro de ar'),
  (2, 4, '2023-08-12', 55000, 210.00, 'Pastilhas dianteiras'),
  (3, 1, '2024-03-01', 90000, 85.50, 'Óleo e filtro'),
  (3, 6, '2023-03-01', 85000, 30.00, 'Inspeção com observação nos pneus'),
  (3, 2, '2023-04-10', 86000, 280.00, 'Troca de 4 pneus'),
  (4, 3, '2024-04-18', 40000, 140.00, 'Revisão com substituição de filtros'),
  (4, 1, '2023-10-10', 35000, 75.00, 'Mudança de óleo'),
  (5, 5, '2024-05-20', 180000, 750.00, 'Substituição completa da embraiagem'),
  (5, 1, '2024-01-10', 175000, 95.00, 'Óleo e filtro'),
  (5, 4, '2023-12-01', 170000, 260.00, 'Pastilhas e discos dianteiros'),
  (5, 6, '2023-11-15', 168000, 35.00, 'Inspeção sem anomalias'),
  (6, 1, '2024-06-01', 25000, 120.00, 'Primeira mudança de óleo'),
  (6, 11, '2024-05-15', 24000, 85.00, 'Recarga de AC'),
  (7, 3, '2024-03-20', 45000, 180.00, 'Revisão dos 45.000 km'),
  (7, 9, '2024-02-10', 43000, 150.00, 'Bateria nova'),
  (8, 2, '2024-04-05', 52000, 340.00, 'Pneus novos Continental'),
  (9, 1, '2024-05-22', 38000, 95.00, 'Óleo sintético'),
  (9, 7, '2024-05-22', 38000, 45.00, 'Alinhamento incluído'),
  (10, 6, '2024-01-30', 15000, 30.00, 'Primeira inspeção'),
  (11, 1, '2024-06-10', 62000, 88.00, 'Óleo e filtro'),
  (12, 4, '2024-04-12', 78000, 290.00, 'Travões completos'),
  (13, 10, '2024-02-28', 95000, 450.00, 'Correia de distribuição'),
  (14, 3, '2024-03-15', 32000, 160.00, 'Revisão standard'),
  (15, 1, '2024-05-08', 55000, 82.00, 'Mudança de óleo'),
  (16, 11, '2024-06-01', 28000, 95.00, 'AC com gás R1234yf'),
  (17, 15, '2024-01-20', 88000, 520.00, 'Amortecedores traseiros'),
  (18, 1, '2024-04-25', 42000, 110.00, 'Óleo Mini Original'),
  (19, 6, '2024-05-30', 18000, 30.00, 'Inspeção aprovada'),
  (20, 2, '2024-03-08', 35000, 380.00, 'Pneus all-season'),
  (21, 18, '2024-06-05', 22000, 50.00, 'Diagnóstico de rotina'),
  (22, 3, '2024-02-14', 48000, 350.00, 'Revisão Porsche');

-- =============================================
-- SERVICE_RECORD_MECHANICS (relação M:N - 45 registos)
-- Demonstra que um serviço pode ter vários mecânicos
-- e um mecânico pode trabalhar em vários serviços
-- =============================================
INSERT INTO service_record_mechanics (service_record_id, mechanic_id) VALUES
  -- Serviço 1 (Mudança óleo): 2 mecânicos
  (1, 1), (1, 7),
  -- Serviço 2 (Revisão): 2 mecânicos
  (2, 7), (2, 15),
  -- Serviço 3 (Pneus): 2 mecânicos
  (3, 9), (3, 22),
  -- Serviço 4 (Inspeção): 1 mecânico
  (4, 7),
  -- Serviço 5 (Óleo): 2 mecânicos
  (5, 1), (5, 8),
  -- Serviço 6 (Travões): 2 mecânicos
  (6, 4), (6, 19),
  -- Serviço 7 (Óleo): 1 mecânico
  (7, 1),
  -- Serviço 8 (Inspeção): 1 mecânico
  (8, 7),
  -- Serviço 9 (Pneus): 1 mecânico
  (9, 9),
  -- Serviço 10 (Revisão): 2 mecânicos
  (10, 7), (10, 12),
  -- Serviço 11 (Óleo): 1 mecânico
  (11, 1),
  -- Serviço 12 (Embraiagem): 3 mecânicos (trabalho complexo)
  (12, 1), (12, 12), (12, 17),
  -- Serviço 13 (Óleo): 2 mecânicos
  (13, 1), (13, 8),
  -- Serviço 14 (Travões): 2 mecânicos
  (14, 4), (14, 19),
  -- Serviço 15 (Inspeção): 1 mecânico
  (15, 7),
  -- Serviço 16 (Óleo): 1 mecânico
  (16, 1),
  -- Serviço 17 (AC): 2 mecânicos especialistas AC
  (17, 5), (17, 21),
  -- Serviço 18 (Revisão): 2 mecânicos
  (18, 7), (18, 15),
  -- Serviço 19 (Bateria): 2 mecânicos eletricistas
  (19, 2), (19, 16),
  -- Serviço 20 (Pneus): 2 mecânicos
  (20, 9), (20, 22),
  -- Serviço 21 (Óleo): 1 mecânico
  (21, 1),
  -- Serviço 22 (Alinhamento): 2 mecânicos
  (22, 3), (22, 9),
  -- Serviço 23 (Inspeção): 1 mecânico
  (23, 7),
  -- Serviço 24 (Óleo): 1 mecânico
  (24, 1),
  -- Serviço 25 (Travões): 2 mecânicos
  (25, 4), (25, 19);
