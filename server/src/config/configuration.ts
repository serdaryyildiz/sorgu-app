export default () => ({
    port:process.env.PORT ||  3000 ,
    base_url :process.env.BASE_URL || "http://localhost:3000",
    host:process.env.HOST,
    db_port:Number(process.env.DB_PORT),
    db_username :process.env.DB_USERNAME,
    db_password:process.env.DB_PASSWORD,
    db:process.env.DATABASE,
});