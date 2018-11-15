"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class HttpExceptionFilter {
    catch(error, host) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        if (error.getStatus() === common_1.HttpStatus.UNAUTHORIZED) {
            if (typeof error.response != 'string') {
                error.response['message'] = error.response.message || 'You do not have permission to access this resource';
            }
        }
        res.status(error.getStatus()).json({
            statusCode: error.getStatus(),
            error: error.response.name || error.name,
            message: error.response.message || error.message,
            errors: error.response.errors || null,
            timestamp: new Date().toISOString(),
            path: req ? req.url : null
        });
    }
}
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map