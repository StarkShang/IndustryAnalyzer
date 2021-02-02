import { Connection, PageParam, Technology } from "@/models";

export default {
    Query: {
        async technology() {
            return Technology.Empty;
        }
    },
    Technology: {
        async news(technology: Technology, { pageParam }: { pageParam: PageParam }, { }) {
            return Connection.Empty;
        },
        async corporations(technology: Technology, { pageParam }: { pageParam: PageParam }, { }) {
            return Connection.Empty;
        },
        async patents(technology: Technology, { pageParam }: { pageParam: PageParam }, { }) {
            return Connection.Empty;
        }
    }
};
