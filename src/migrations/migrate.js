const CreateUserTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
          users(
          id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          email VARCHAR(50) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) NOT NULL DEFAULT 'customer',
          suspend_status BOOLEAN NOT NULL DEFAULT false,
          email_verified BOOLEAN NOT NULL DEFAULT false,
          createdat TIMESTAMP NOT NULL DEFAULT NOW(),
          updatedat TIMESTAMP NOT NULL DEFAULT NOW()
          )`;
const CreateMealTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
          meals(
            id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
            name VARCHAR(50) NOT NULL,
            description VARCHAR(1200) NOT NULL,
            imageUrl VARCHAR(300) NOT NULL, 
            price int NOT NULL,
            quantity int NOT NULL, 
            caterer_id UUID NOT NULL,
            createdat TIMESTAMP NOT NULL DEFAULT NOW(),
            updatedat TIMESTAMP NOT NULL DEFAULT NOW(),
            FOREIGN KEY (caterer_id) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE
            )
            `;
const CreateMenuTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
                    menu(
                    id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
                    meal_id UUID NOT NULL,
                    caterer_id UUID NOT NULL,
                    addedon TIMESTAMP NOT NULL DEFAULT NOW(),
                    FOREIGN KEY (meal_id) REFERENCES "meals" (id) ON UPDATE CASCADE ON DELETE CASCADE,
                    FOREIGN KEY (caterer_id) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE
                    )
                    `;
const CreateOrderTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
orders(
          id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
          user_id UUID NOT NULL,
        status VARCHAR(25) NOT NULL DEFAULT 'pending',
        deliveryAddress VARCHAR(500) NOT NULL,
        payment_status VARCHAR(150) NOT NULL DEFAULT 'pos',
        payment_id UUID NULL,
        createdat TIMESTAMP NOT NULL DEFAULT NOW(),
        updatedat TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE
        )
      `;
const CreateOrderItemTable = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
orderitem(
  id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL,
  meal_id UUID NOT NULL,
  price int NOT NULL,
  quantity int NOT NULL DEFAULT 1,
  caterer_id UUID NOT NULL,
  createdat TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedat TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (meal_id) REFERENCES "meals" (id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (caterer_id) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES "orders" (id) ON UPDATE CASCADE ON DELETE CASCADE
)
      `;

const CreateTransactionTable = `
      CREATE TABLE IF NOT EXISTS
transactions(
       id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL,
      order_id UUID NOT NULL,
      email VARCHAR(255) NOT NULL,
      amount int NOT NULL,
      createdat TIMESTAMP NOT NULL DEFAULT NOW(),
      updatedat TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (user_id) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (order_id) REFERENCES "orders" (id) ON UPDATE CASCADE ON DELETE CASCADE
      )
      `;
const CreateRestarauntTable = `
  CREATE TABLE IF NOT EXISTS
  restaraunts(
    id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    imageUrl VARCHAR(300) NOT NULL, 
    location VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL,
    vendor_id UUID NOT NULL,
    FOREIGN KEY (vendor_id) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE
  )
`;
//Addresses

const migrate = async (pool) => {
  try {
    await pool.query(CreateUserTable);
    console.log("user table created");
    await pool.query(CreateMealTable);
    console.log("meal table created");
    await pool.query(CreateMenuTable);
    console.log("menu table created");
    await pool.query(CreateOrderTable);
    console.log("order table created");
    await pool.query(CreateTransactionTable);
    console.log("transaction table created");
    await pool.query(CreateRestarauntTable);
    console.log("restaraunt table created");
    await pool.query(CreateOrderItemTable);
    console.log("order item table created");
  } catch (e) {
    console.log(e);
  }
};

export default migrate;
