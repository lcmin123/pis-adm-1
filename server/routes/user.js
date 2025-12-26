const express = require("express");
const router = express.Router();

require("dotenv").config();

const { db } = require("../db/db.js");

const { users } = require("../db/schema");
const { eq } = require("drizzle-orm");

router.get("/users", async (req, res) => {
  try {
    const rows = await db.select().from(users);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { name, birth, sex, id } = req.body;
    const rows = await db
      .insert(users)
      .values({ name, birth, sex, id }) // 컬럼은 여기서 매핑
      .returning();
    res.status(201).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await db.select().from(users).where(eq(users.id, id));
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { ath_no } = req.body;

    // 1. 사용자 존재 여부 및 기존 데이터 확인
    const userRows = await db.select().from(users).where(eq(users.id, id));
    if (userRows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userRows[0];

    // 2. 이미 ath_no가 생성되었는지 확인
    if (user.ath_no) {
      return res.status(400).json({ error: "Athletic number already exists for this user" });
    }

    // 3. 전달된 ath_no 형식 검증 (birth-id 규칙 확인)
    const expectedAthNo = `${user.birth}-${user.id}`;
    if (ath_no !== expectedAthNo) {
      return res.status(400).json({ error: "Invalid athletic number format. Must be {birth}-{id}" });
    }

    // 4. DB 내 ath_no 중복 여부 체크 (이미 unique 제약 조건이 있지만 사전에 체크)
    const duplicateRows = await db.select().from(users).where(eq(users.ath_no, ath_no));
    if (duplicateRows.length > 0) {
      return res.status(409).json({ error: "This athletic number is already assigned to another user" });
    }

    // 5. 업데이트 수행
    const updatedRows = await db
      .update(users)
      .set({ ath_no })
      .where(eq(users.id, id))
      .returning();

    res.json(updatedRows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
