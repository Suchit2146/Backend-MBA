const languageType = {
    english: "ENGLISH",
    hindi: "HINDI",
    tamil: "TAMIL"
}

const releaseStatusType = {
    released: "RELEASED",
    unReleased: "UNRELEASED",
    blocked: "BLOCKED"
}

const userTypesAuth = {
    customer: "CUSTOMER",
    client: "CLIENT",
    admin: "ADMIN"
}

const userStatusAuth = {
    pending: "PENDING",
    blocked: "BLOCKED",
    approved: "APPROVED"
}

const bookingStatus = {
    inProgress: "INPROGRESS",
    completed: "COMPLETED",
    failed: "FAILED",
    cancelled: "CANCELLED",
    expired: "EXPIRED"
}

module.exports = {
    languageType,
    releaseStatusType,
    userTypesAuth,
    userStatusAuth,
    bookingStatus
}