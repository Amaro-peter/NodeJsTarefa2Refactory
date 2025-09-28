import { sendEmail } from "@/utils/send-email";
import { makeGetByMostLikedUseCase } from "../factories/likes/make-get-by-most-liked-use-case";


export async function sendDailyMostLikedPosts() {
    const getMostLikedPosts = makeGetByMostLikedUseCase();
    const results = await getMostLikedPosts.execute();

    const postHtml = results.posts.map((post: any) => `<li><h2>${post.title}</h2><p>${post.content}</p><small>${post._count.likes} likes</small></li>`).join('');

    await sendEmail({
        to: 'pedro.amaro.fe@gmail.com',
        subject: 'Top Posts de hoje !',
        message: "O que rolou hoje:",
        html: `<h1>Posts com mais likes!</h1><ul>${postHtml}</ul>`,
    });
}