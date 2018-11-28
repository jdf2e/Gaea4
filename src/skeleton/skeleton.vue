<template>
    <skeleton-loading>
        <row>
            <skeleton-square width="7.5rem" height="5rem" ></skeleton-square>
        </row>
        <row padding="0.3rem 0.2rem 0 ">

            <skeleton-square width="4rem"  ></skeleton-square>
            <skeleton-square width="1rem" margin="0 0 0 0.8rem"></skeleton-square>
            <skeleton-square width="1rem"  margin="0 0 0 0.2rem"></skeleton-square>
        </row>
        <row padding="0.4rem 0.2rem">
            <skeleton-circle  diameter="1rem"></skeleton-circle>
            <skeleton-square width="5.5rem" :count="3" margin="0.1rem 0.2rem 0.1rem 0.2rem"></skeleton-square>
        </row>

        <row padding="0 0.2rem 0.4rem">
            <skeleton-circle  diameter="1rem"></skeleton-circle>
            <column>
                    <skeleton-square width="5.5rem" :count="2" margin="0.1rem 0.2rem 0.1rem 0.2rem"></skeleton-square>
                    <skeleton-square width="2rem"    margin="0.1rem 0.2rem 0.1rem 0.2rem"></skeleton-square>
            </column>
        </row>

        <row padding="0 0.2rem 0.4rem">
            <skeleton-square width="1.5rem" height="1.5rem" ></skeleton-square>
            <column padding="0 0 0 0.2rem">
                <skeleton-square width="4.5rem"   height="0.2rem" margin="0 0.2rem 0.1rem 0.2rem"></skeleton-square>
                <skeleton-square width="2rem"  height="0.15rem"   margin="0.1rem 0.2rem 0.1rem 0.2rem"></skeleton-square>
                <skeleton-square width="4.5rem"  backColor="#ffffff" :count="2"></skeleton-square>
                <skeleton-square width="1rem"     margin="0 0.2rem 0.1rem 0.2rem"></skeleton-square>
            </column>
            
        </row>
            <row padding="0 0.2rem 0.4rem">
                <skeleton-square width="0.6rem" height="0.6rem" v-for=" i in 5" :key="i" margin="0.3rem"></skeleton-square>
            </row>
        
    </skeleton-loading>
  
</template>

<script>
import skeleton from '../component/skeleton/index'
export default {
    data(){
        return{

        }
    }
    
}
</script>
