var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

// Chỉ can thiệp nếu request xuất phát từ Locket
if (ua.includes("Locket")) {
    obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

    // Đảm bảo cấu trúc subscriber luôn tồn tại
    if (!obj.subscriber) obj.subscriber = {};
    if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
    if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

    // Cấu hình gói Gold
    var productId = "locket_1600_1y";
    var VCC = {
        auto_resume_date: null,
        display_name: productId,
        is_sandbox: true,
        ownership_type: "PURCHASED",
        billing_issues_detected_at: null,
        management_url: "https://apps.apple.com/account/subscriptions",
        period_type: "normal",
        price: {
            "amount": 399000.0,
            "currency": "VND"
        },
        expires_date: "9999-01-09T10:10:14Z",
        grace_period_expires_date: null,
        refunded_at: null,
        unsubscribe_detected_at: null,
        original_purchase_date: "2026-10-22T10:10:15Z",
        purchase_date: "2026-10-22T10:10:14Z",
        store: "app_store",
        store_transaction_id: "2000001108724193"
    };

    var locketGold = {
        grace_period_expires_date: null,
        purchase_date: "2026-10-22T10:10:14Z",
        product_identifier: productId,
        expires_date: "9999-01-09T10:10:14Z"
    };

    // Gán quyền lợi (Locket thường dùng key 'pro' hoặc 'gold' hoặc 'locket_gold')
    obj.subscriber.subscriptions[productId] = VCC;
    obj.subscriber.entitlements["pro"] = locketGold;
    obj.subscriber.entitlements["gold"] = locketGold;
    obj.subscriber.entitlements["locket_gold"] = locketGold;
}

$done({ body: JSON.stringify(obj) });
