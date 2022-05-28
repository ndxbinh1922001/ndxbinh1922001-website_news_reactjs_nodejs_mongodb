import bcrypt from "bcryptjs"
const data = {
  users: [
    {
      name: "Administrator",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("1"),
      isAdmin: true,
    },
    {
      name: "Binh",
      email: "binh@gmail.com",
      password: bcrypt.hashSync("1"),
      isAdmin: false,
    },
  ],
  posts: [
    {
      title:"Việt Nam vô địch seagame",
      slug:"viet-nam-vo-dic-sea-game",
      image:"https://media1.nguoiduatin.vn/media/bui-thi-lan-anh/2019/12/11/u22-viet-nam-vo-dich-sea-games.jpg",
      category:"Thể thao",
      content:"(NLĐO) - Bàn thắng từ pha đánh đầu hiểm hóc của Mạnh Dũng cuối hiệp 2 đủ đưa U23 Việt Nam vượt qua U23 Thái Lan, bảo vệ thành công chiếc HCV môn bóng đá nam SEA Games và viết lại lịch sử. Việt Nam trở thành đội đầu tiên vô địch SEA Games với thành tích giữ sạch lưới, sau 43 năm.",
      
    },
    {
      title:"Việt Nam thắng thái lan",
      slug:"viet-nam-thang-thai-lan",
      image:"https://media1.nguoiduatin.vn/media/bui-thi-lan-anh/2019/12/11/u22-viet-nam-vo-dich-sea-games.jpg",
      category:"Thể thao",
      content:"(NLĐO) - Bàn thắng từ pha đánh đầu hiểm hóc của Mạnh Dũng cuối hiệp 2 đủ đưa U23 Việt Nam vượt qua U23 Thái Lan, bảo vệ thành công chiếc HCV môn bóng đá nam SEA Games và viết lại lịch sử. Việt Nam trở thành đội đầu tiên vô địch SEA Games với thành tích giữ sạch lưới, sau 43 năm.",
    },
    
  ],
  uncheckposts: [
    {
      title:"Vô địch seagame",
      slug:"vo-dic-seagame",
      image:"https://media1.nguoiduatin.vn/media/bui-thi-lan-anh/2019/12/11/u22-viet-nam-vo-dich-sea-games.jpg",
      category:"Seagame",
      content:"(NLĐO) - Bàn thắng từ pha đánh đầu hiểm hóc của Mạnh Dũng cuối hiệp 2 đủ đưa U23 Việt Nam vượt qua U23 Thái Lan, bảo vệ thành công chiếc HCV môn bóng đá nam SEA Games và viết lại lịch sử. Việt Nam trở thành đội đầu tiên vô địch SEA Games với thành tích giữ sạch lưới, sau 43 năm.",
      
    },
    {
      title:"Thắng thái lan",
      slug:"Thang-thai-lan",
      image:"https://media1.nguoiduatin.vn/media/bui-thi-lan-anh/2019/12/11/u22-viet-nam-vo-dich-sea-games.jpg",
      category:"Esport",
      content:"(NLĐO) - Bàn thắng từ pha đánh đầu hiểm hóc của Mạnh Dũng cuối hiệp 2 đủ đưa U23 Việt Nam vượt qua U23 Thái Lan, bảo vệ thành công chiếc HCV môn bóng đá nam SEA Games và viết lại lịch sử. Việt Nam trở thành đội đầu tiên vô địch SEA Games với thành tích giữ sạch lưới, sau 43 năm.",
    },
    
  ],
};
export default data;
