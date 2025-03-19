import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UsersService} from "./users/users.service";
import {UsersController} from "./users/users.controller";
import {UsersModule} from "./users/users.module";
import {PrismaModule} from "../prisma/prisma.module";
import {GameModule} from "./game/game.module";
import {GameController} from "./game/game.controller";
import {GameService} from "./game/game.service";

@Module({
    imports: [
        PrismaModule,
        UsersModule,
        GameModule],
    controllers: [
        AppController,
        UsersController,
        GameController,
    ],
    providers: [
        AppService,
        UsersService,
        GameService,
    ],
})
export class AppModule {
}
